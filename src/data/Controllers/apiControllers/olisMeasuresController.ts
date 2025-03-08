import { useEffect, useMemo, useState } from "react";
import { UserTrackedMeasure } from "../../../types/MeasureTypes";
import { LocalStoreageMeasureCache, MeasureCacheObject, UniqueMeasureIdentifier } from "../../../types/cache";
import { isOutOfDate } from "../../../utils/time";
import { fetchAgendaItems, fetchMeasure } from "../../measures/measures";
import { getMeasureUniqueId } from "../../../utils/measure";

export const userOLISMeasureController = (userTrackedMeasures: UserTrackedMeasure[] | undefined) => {
    const [measuresCacheObject, setMeasureCacheObjects] = useState(getMeasuresFromLocalStorage());
    const [areMeasureCacheObjectLoading, setAreMeasureCacheObjectsLoading] = useState(false);
    const utmIdList = useMemo(() => userTrackedMeasures && userTrackedMeasures.map((utm) => getMeasureUniqueId(utm)), [userTrackedMeasures])

    useEffect(() => {
        if(!utmIdList) {
            return;
        }

        const { refreshList, removeList } = getRequestList(measuresCacheObject, utmIdList);
        
        console.log('refresh + remove', refreshList.length, removeList.length)

        // REFRESH STALE + GET NEW 
        setAreMeasureCacheObjectsLoading(true);
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
        setAreMeasureCacheObjectsLoading(false);
        
        // REMOVE UNUSED
        setMeasureCacheObjects((prev) => {
            const filteredObj = Object.fromEntries(
                Object.entries(prev).filter(([key]) => !removeList.includes(key))
              );
            return filteredObj
        });

    }, [utmIdList])

    useEffect(() => {
        // SET TO LOCAL STORAGE CACHE
        console.log('setting to', measuresCacheObject)
        localStorage.setItem('Measures', JSON.stringify(measuresCacheObject));
    }, [measuresCacheObject])

    return {
        measuresCacheObject,
        areMeasureCacheObjectLoading,
        // could set a total number here too for a progress bar
    }
}

const getMeasuresFromLocalStorage = () => {
    const result = localStorage.getItem('Measures');
    if(result) {
        const cache = JSON.parse(result) as LocalStoreageMeasureCache;
        // const measures = Object.keys(cache).map((uniqueMeasureId: UniqueMeasureIdentifier) => {
        //     return cache[uniqueMeasureId] as MeasureCacheObject;
        // })
        return cache;
    }
    return {};
}

// const setMeasureCacheObjectsToCache = () => {

// }

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
        // console.log(uniqueId, 'utmlist', utmIdList);
        if(!utmIdList.includes(uniqueId)) {
            removeList.push(uniqueId);
        }
    })

    return {
        refreshList,
        removeList,
    }
}