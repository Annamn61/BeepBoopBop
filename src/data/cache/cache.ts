import { useEffect, useState } from "react";
import { AgendaItem } from "../../types/CommitteeAgendaTypes";
import { Measure, UserTrackedMeasure } from "../../types/MeasureTypes";
import useCommitteeAgendaStore from "../../store/CommitteeAgendaStore";
import { useMeasureStore } from "../../store/MeasureStore";
import useHistoryStore from "../../store/HistoryStore";
import { useUser } from "../../utils/user";
import { userTrackedMeasures } from "../userMeasureData";

export interface LocalStoreageMeasureCache {
    [uniqueMeasureId: UniqueMeasureIdentifier] : MeasureCacheObject;
}

export interface MeasureCacheObject {
    MeasureData: any,
    CommitteeAgendaItems: any,
    lastUpdate: string,
}

export type UniqueMeasureIdentifier = string;
export type MeasurePrefix = string;
export type MeasureNumber = number;
export type SessionKey = string;

// export const getUniqueMeasureIdentifier = (measurePrefix: MeasurePrefix, measureNumber: MeasureNumber, sessionKey: SessionKey) => {
//     return `${measurePrefix}${measureNumber}${sessionKey}`;
// }

export const getUniqueMeasureIdentifier = (id: string, sessionKey: SessionKey) => {
    return `${id}${sessionKey}`;
}

export const isCacheOutOfDateById = (id: string, sessionKey: SessionKey) => {
    const uniqueMeasureId = getUniqueMeasureIdentifier(id, sessionKey);
    const measures = getLocalStorageCache();
    if(!measures[uniqueMeasureId]?.lastUpdate) {
        return true;
    }

    const now = new Date();
    const lastUpdated = new Date(measures[uniqueMeasureId].lastUpdate)
    const oneHourInMilliseconds = 60 * 60 * 1000;
    // const oneDayInMilliseconds = 24 * oneHourInMilliseconds;    
    const dateToUpdateData = new Date(lastUpdated.getTime() + oneHourInMilliseconds)
    return now > dateToUpdateData;
}

  export const getLocalStorageCache = () => {
    const result = localStorage.getItem('Measures');
    if(result) {
      return  JSON.parse(result) as LocalStoreageMeasureCache;
    }
    return {};
  }

  export const getAllMeasureDataFromLocalStorage = () => {
    const cache = getLocalStorageCache();
    const measures = Object.keys(cache).map((uniqueMeasureId: UniqueMeasureIdentifier) => {
        return cache[uniqueMeasureId].MeasureData;
    })
    return measures;
  }

  export const getAllHistoryDataFromLocalStorage = () => {
    const cache = getLocalStorageCache();

    // TODO: THIS IS A TEMPORARY FIX
    // getLocalStorageCache() is returning everything in the cache so we are trying to access the value of "lastUpdated" and "measures" which is undefined and therefore breaks the app
    // I think we might need to reorganize the way the cache data object is saved 
    const history = Object.keys(cache)
      .map((uniqueMeasureId: UniqueMeasureIdentifier) => cache[uniqueMeasureId].MeasureData)
      .filter((measure) => measure?.value?.[0]?.MeasureHistoryActions)
      .flatMap((measure) => measure.value?.[0]?.MeasureHistoryActions ?? []);
    return history;
  }

  export const getAllCommitteeAgendaItemsFromStore = () => {
    const cache = getLocalStorageCache();
    const agendaItems = Object.keys(cache).filter((uniqueMeasureId: UniqueMeasureIdentifier) => cache[uniqueMeasureId]?.CommitteeAgendaItems?.value).flatMap((uniqueMeasureId: UniqueMeasureIdentifier) => {
        return cache[uniqueMeasureId].CommitteeAgendaItems.value;
    })
    return agendaItems;
  }

  export const useLocalStorage = () => {
    const [cacheObject, setCacheObject] = useState<LocalStoreageMeasureCache>(getLocalStorageCache());
    const [trackedMeasures, setTrackedMeasures] = useState<UserTrackedMeasure[]>();
    const { setUnfilteredMeasures, setUserTrackedMeasures } = useMeasureStore();
    const { setUnfilteredHistory } = useHistoryStore();
    const { setUnfilteredCommitteeAgenda } = useCommitteeAgendaStore();

    const { currentUser } = useUser();

    useEffect(() => {
        if(!currentUser) {
            setTrackedMeasures(userTrackedMeasures)
            localStorage.setItem('UserTrackedMeasures', JSON.stringify(userTrackedMeasures))
        } else {
            // get the users actual data from the remote 
            // set this
        }
    }, [currentUser]);

    useEffect(() => {
        setUserTrackedMeasures(trackedMeasures || []);
    }, [trackedMeasures]);

    useEffect(() => {
        localStorage.setItem('Measures', JSON.stringify(cacheObject));
        setUnfilteredMeasures(getAllMeasureDataFromLocalStorage());
        setUnfilteredHistory(getAllHistoryDataFromLocalStorage());
        setUnfilteredCommitteeAgenda(getAllCommitteeAgendaItemsFromStore());
    }, [cacheObject])

    const updateMeasureItemInCache = (measure: Measure, agendaItems: AgendaItem, uniqueMeasureId: UniqueMeasureIdentifier) => {
      const getNewCacheObject = (prev: LocalStoreageMeasureCache) => {
        const tempCache = {...prev};
          tempCache[uniqueMeasureId] = {
          MeasureData: measure,
          CommitteeAgendaItems: agendaItems,
          lastUpdate: new Date().toISOString(),
        }
        return tempCache
      }

      setCacheObject((prev) => getNewCacheObject(prev));
    }

    const syncTrackedItemsWithCache = (userTrackedIds: string[]) => {
        const newCache: LocalStoreageMeasureCache = {};
        userTrackedIds.forEach(id => {
            if (cacheObject[id]) {
                newCache[id] = cacheObject[id];
            }
        });
                    
        setCacheObject(newCache);
    }

    return {
        cacheObject,
        updateMeasureItemInCache,
        syncTrackedItemsWithCache
    }
  }


