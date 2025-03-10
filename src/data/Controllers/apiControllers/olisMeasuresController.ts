import { Component, useEffect, useMemo, useState } from "react";
import { UserTrackedMeasure } from "../../../types/MeasureTypes";
import { LocalStoreageMeasureCache, LocalStorageCommitteeCache } from "../../../types/cache";
import { isOutOfDate } from "../../../utils/time";
import { fetchAgendaItems, fetchMeasure, fetchCommittees } from "../../measures/measures";
import { getMeasureUniqueId } from "../../../utils/measure";

export const userOLISMeasureController = (userTrackedMeasures: UserTrackedMeasure[] | undefined) => {
    const [measuresCacheObject, setMeasureCacheObjects] = useState(getMeasuresFromLocalStorage());
    const [isMeasureCacheObjectLoading, setIsMeasureCacheObjectLoading] = useState(false);
    const [committeesCacheObject, setCommitteesCacheObject] = useState(getCommitteesFromLocalStorage());
    const [isCommitteesCacheObjectLoading, setIsCommitteesCacheObjectLoading] = useState(false);
    const utmIdList = useMemo(() => userTrackedMeasures && userTrackedMeasures.map((utm) => getMeasureUniqueId(utm)), [userTrackedMeasures])

    useEffect(() => {
        if(!utmIdList) {
            return;
        }

        const { refreshList, removeList } = getRequestList(measuresCacheObject, utmIdList);
        
        // REFRESH STALE + GET NEW 
        setIsMeasureCacheObjectLoading(true);
        refreshList.forEach((id) => {
            fetchMeasure(id).then((measureValue) => {
                setMeasureCacheObjects((prev) => ({
                    ...prev,
                    [id]: {
                        ...prev[id],
                        MeasureData: measureValue,
                        lastUpdate: new Date().toISOString(),
                    }
                }));
            })
        })

        refreshList.forEach((id) => {
            fetchAgendaItems(id).then((agendaValue) => {
                setMeasureCacheObjects((prev) => ({
                    ...prev,
                    [id]: {
                        ...prev[id],
                        CommitteeAgendaItems: agendaValue,
                        lastUpdate: new Date().toISOString(),
                    }
                }));
            })
        })

        setIsMeasureCacheObjectLoading(false);

        // REMOVE UNUSED
        setMeasureCacheObjects((prev) => {
            const filteredObj = Object.fromEntries(
                Object.entries(prev).filter(([key]) => !removeList.includes(key))
              );
            return filteredObj
        });

    }, [utmIdList])

    useEffect(() => {
        // FETCH COMMITTEES
        setIsCommitteesCacheObjectLoading(true);
        fetchCommittees().then((committees) => {
            setCommitteesCacheObject(committees);
            setIsCommitteesCacheObjectLoading(false);
        });
    }, [])

    useEffect(() => {
        // SET TO LOCAL STORAGE CACHE
        console.log('setting to', measuresCacheObject)
        localStorage.setItem('Measures', JSON.stringify(measuresCacheObject));
    }, [measuresCacheObject])

    useEffect(() => {
        // SET TO LOCAL STORAGE CACHE
        localStorage.setItem('Committees', JSON.stringify(committeesCacheObject));
    }, [committeesCacheObject]);

    return {
        measuresCacheObject,
        isMeasureCacheObjectLoading,
        committeesCacheObject,
        isCommitteesCacheObjectLoading,
        // could set a total number here too for a progress bar
    }
}

const getMeasuresFromLocalStorage = () => {
    const result = localStorage.getItem('Measures');
    if(result) {
        const cache = JSON.parse(result) as LocalStoreageMeasureCache;
        return cache;
    }
    return {};
}

const getCommitteesFromLocalStorage = () => {
    const result = localStorage.getItem('Committees');
    if(result) {
        const cache = JSON.parse(result) as LocalStorageCommitteeCache;
        return cache;
    }
    return {};
}

const getRequestList = (measureCacheObjects: LocalStoreageMeasureCache, utmIdList: string[]) => {
    const refreshList: string[] = [];
    const removeList: string[] = [];
    const measureCacheObjKeys = Object.keys(measureCacheObjects);

    // add ids not in the cache, or out of data in the cache
    utmIdList.forEach((utmKey) => {
        if(!measureCacheObjKeys.includes(utmKey) || isOutOfDate(measureCacheObjects[utmKey].lastUpdate)) {
            refreshList.push(utmKey);
        }
    })

    // Remove ids not in the user list
    measureCacheObjKeys.forEach((uniqueId) => {
        if(!utmIdList.includes(uniqueId)) {
            removeList.push(uniqueId);
        }
    })

    return {
        refreshList,
        removeList,
    }
}