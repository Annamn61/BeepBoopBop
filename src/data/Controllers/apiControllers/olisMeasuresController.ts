import { useEffect, useMemo, useState } from "react";
import { LocalStoreageMeasureCache, LocalStorageCommitteeCache, LocalStorageLegislatorCache } from "../../../types/cache";
import { isOutOfDate_OneHour, isOutOfDate_OneWeek } from "../../../utils/time";
import { fetchAgendaItems, fetchMeasure, fetchCommittees, fetchLegislators } from "../../measures/measures";
import { useUserStore } from "../../../store/UserStore";

export const userOLISMeasureController = () => {
    const userTrackedMeasures = useUserStore((state) => state.userTrackedMeasures);
    const groupMeasures = useUserStore((state) => state.groupMeasures);
    const getAllMeasureIdsForFetching = useUserStore((state) => state.getAllMeasureIdsForFetching);
    const [measuresCacheObject, setMeasureCacheObjects] = useState(getMeasuresFromLocalStorage());
    const [isMeasureCacheObjectLoading, setIsMeasureCacheObjectLoading] = useState(false);
    const [committeesCacheObject, setCommitteesCacheObject] = useState(getCommitteesFromLocalStorage());
    const [isCommitteesCacheObjectLoading, setIsCommitteesCacheObjectLoading] = useState(false);
    const [legislatorsCacheObject, setLegislatorsCacheObject] = useState(getLegislatorsFromLocalStorage());
    const [isLegislatorsCacheObjectLoading, setIsLegislatorsCacheObjectLoading] = useState(false);
    const utmIdList = useMemo(() => getAllMeasureIdsForFetching(), [userTrackedMeasures, groupMeasures, getAllMeasureIdsForFetching])
    let b_CommitteesOutOfDate = committeesCacheObject ? getCommitteesOutOfDate(committeesCacheObject) : true;
    let b_LegislatorsOutOfDate = legislatorsCacheObject ? getLegislatorsOutOfDate(legislatorsCacheObject) : true;

    useEffect(() => {
        if(!utmIdList || utmIdList.length === 0) {
            return;
        }

        const { refreshList, removeList } = getRequestList(measuresCacheObject, utmIdList);

        // hacky way to check if committees are in need of update
        b_CommitteesOutOfDate = committeesCacheObject ? getCommitteesOutOfDate(committeesCacheObject) : true;
        b_LegislatorsOutOfDate = legislatorsCacheObject ? getLegislatorsOutOfDate(legislatorsCacheObject) : true;
        
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
            setCommitteesCacheObject({
                ...committees,
                lastUpdate: new Date().toISOString(),
            });
            setIsCommitteesCacheObjectLoading(false);
        });
    }, [b_CommitteesOutOfDate])

    useEffect(() => {
        // FETCH LEGISLATORS
        setIsLegislatorsCacheObjectLoading(true);
        fetchLegislators().then((legislators) => {
            setLegislatorsCacheObject({
                ...legislators,
                lastUpdate: new Date().toISOString(),
            });
            setIsLegislatorsCacheObjectLoading(false);
        });
    }, [b_LegislatorsOutOfDate])

    useEffect(() => {
        // SET TO LOCAL STORAGE CACHE
        localStorage.setItem('Measures', JSON.stringify(measuresCacheObject));
    }, [measuresCacheObject])

    useEffect(() => {
        // SET TO LOCAL STORAGE CACHE
        localStorage.setItem('Committees', JSON.stringify(committeesCacheObject));
    }, [committeesCacheObject]);

    useEffect(() => {
        // SET TO LOCAL STORAGE CACHE
        localStorage.setItem('Legislators', JSON.stringify(legislatorsCacheObject));
    }, [legislatorsCacheObject]);

    return {
        measuresCacheObject,
        isMeasureCacheObjectLoading,
        committeesCacheObject,
        isCommitteesCacheObjectLoading,
        legislatorsCacheObject,
        isLegislatorsCacheObjectLoading,
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
    return null;
}

const getLegislatorsFromLocalStorage = () => {
    const result = localStorage.getItem('Legislators');
    if(result) {
        const cache = JSON.parse(result) as LocalStorageLegislatorCache;
        return cache;
    }
    return null;
}

const getRequestList = (measureCacheObjects: LocalStoreageMeasureCache, utmIdList: string[]) => {
    const refreshList: string[] = [];
    const removeList: string[] = [];
    const measureCacheObjKeys = Object.keys(measureCacheObjects);

    // add ids not in the cache, or out of data in the cache
    utmIdList.forEach((utmKey) => {
        if(!measureCacheObjKeys.includes(utmKey) || isOutOfDate_OneHour(measureCacheObjects[utmKey].lastUpdate)) {
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

// check if committees are out of date
const getCommitteesOutOfDate = (committeeCacheObject: LocalStorageCommitteeCache) => {
    return committeeCacheObject ? isOutOfDate_OneWeek(committeeCacheObject.lastUpdate) : true;
}

// check if legislators are out of date
const getLegislatorsOutOfDate = (legislatorCacheObject: LocalStorageLegislatorCache) => {
    return legislatorCacheObject ? isOutOfDate_OneWeek(legislatorCacheObject.lastUpdate) : true;
}