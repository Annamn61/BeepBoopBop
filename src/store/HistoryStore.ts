import { create } from 'zustand';
import { useMeasureStore } from './MeasureStore';
import { DateGroupedUpdates, GenericUpdateItem, Measure, MeasureDocument, MeasureHistoryItem } from '../types/MeasureTypes';
import { getMeasureId } from '../utils/measure';
import { importantDates } from '../data/ImportantLegistlativeDates';
import { getYYYYMMDD } from '../utils/time';
// useMeasureStore.getState().filteredMeasures;

interface HistoryState {
  unfilteredHistory: MeasureHistoryItem[];
  setUnfilteredHistory: (history: MeasureHistoryItem[]) => void;
  getHistoryById: (id: Measure['id']) => MeasureHistoryItem[];
//   getFutureHistoryById: (id: Measure['id']) => MeasureHistoryItem[];
  getFilteredHistory: () => MeasureHistoryItem[];
//   getFilteredHistorySortedByDate: () => DateGroupedHistory;
getUpdatesById: (id: string) => GenericUpdateItem[];
  getFilteredUpdatesSortedByDate: () => DateGroupedUpdates;
  getFilteredUpdatesLength: () => number;
  getFilteredLatestUpdatesOnlyByDate: () => DateGroupedUpdates;
  getFilteredLatestUpdatesLength: () => number;
}

export const useHistoryStore = create<HistoryState>((set, get) => ({
    unfilteredHistory: [],
    setUnfilteredHistory: (historyObjects) => set({ unfilteredHistory: historyObjects }),
    getHistoryById: (id) => sortDates(get().unfilteredHistory.filter((item) => getMeasureId(item.MeasurePrefix, item.MeasureNumber) === id)),
    // getFutureHistoryById: (id) => get().getHistoryById(id).filter(history => new Date(history.ActionDate) > new Date()),
    getFilteredHistory: () => filterHistoryToFilteredMeasures(get().unfilteredHistory, useMeasureStore.getState().getFilteredMeasureIds()),
    // getFilteredHistorySortedByDate: () => getHistorySortedIntoDates(get().getFilteredHistory()),
    getUpdatesById: (id) => [...convertHistoryToUpdates(get().getHistoryById(id)), ...convertDocumentsToUpdates(useMeasureStore.getState().getMeasureDocumentsById(id))],
    getFilteredUpdatesSortedByDate: () => getUpdatesSortedIntoDates(getAllUpdatesFiltered()),
    getFilteredUpdatesLength: () => getAllUpdatesFiltered().length,
    getFilteredLatestUpdatesOnlyByDate: () => getUpdatesSortedIntoDates(getMeasuresLatestUpdateOnly(getAllUpdatesFiltered())),
    getFilteredLatestUpdatesLength: () => getMeasuresLatestUpdateOnly(getAllUpdatesFiltered()).length,
}));

export default useHistoryStore;

const convertHistoryToUpdates = (histories: MeasureHistoryItem[]) => {
    return histories.map((history) => {
        const {ActionDate, ActionText, MeasurePrefix, MeasureNumber, SessionKey, MeasureHistoryId} = history;

        const MeasureName = useMeasureStore.getState().getMeasureNicknameById(getMeasureId(MeasurePrefix, MeasureNumber));

        const text = history.ActionText.toLowerCase()
        const isMeeting = text.includes('public hearing') || text.includes('work session');

        return {
           Text: ActionText,
           Date: ActionDate,
           MeasurePrefix,
           MeasureNumber,
           MeasureName,
           SessionKey,
           Link: null,
           Key: MeasureHistoryId.toString(),
           Type: isMeeting ? 'CommitteeMeeting' as "CommitteeMeeting" : 'MeasureHistoryItem' as "MeasureHistoryItem",
        }
    })
}

const convertDocumentsToUpdates = (documents: MeasureDocument[] | undefined) => {
    if(!documents) return [];
    return documents.map((doc) => {
        const {CreatedDate, DocumentUrl, VersionDescription, MeasurePrefix, MeasureNumber, SessionKey} = doc;

        const MeasureName = useMeasureStore.getState().getMeasureNicknameById(getMeasureId(MeasurePrefix, MeasureNumber));

        return {
           Text: VersionDescription,
           Date: CreatedDate,
           MeasurePrefix,
           MeasureNumber,
           MeasureName,
           SessionKey,
           Link: DocumentUrl,
           Key: DocumentUrl,
           Type: 'MeasureDocument' as "MeasureDocument",
        }
    })
    
}

const filterHistoryToFilteredMeasures = (history: MeasureHistoryItem[], filteredIds: Measure['id'][]) => {
    
    return history.filter((historyItem) => {
        const id = getMeasureId(historyItem.MeasurePrefix, historyItem.MeasureNumber);
        return filteredIds.includes(id);
    })
    
}

// Sort by full datetime (ascending)
const sortDates = (history: MeasureHistoryItem[]) => {
    return history.sort((a, b) => new Date(b.ActionDate).getTime() - new Date(a.ActionDate).getTime())
}

const getAllUpdatesFiltered = (): GenericUpdateItem[] => {
    return [...convertHistoryToUpdates(useHistoryStore.getState().getFilteredHistory()), ...convertDocumentsToUpdates(useMeasureStore.getState().getFilteredMeasureDocuments())];
}

const getMeasuresLatestUpdateOnly = (updates: GenericUpdateItem[]) => {
    const latesDocuments: {[id: string] : GenericUpdateItem} = {};
    updates.forEach((update) => {
        const measureId = getMeasureId(update.MeasurePrefix, update.MeasureNumber);
        const currentLatest = latesDocuments[measureId];
        if(!currentLatest || new Date(currentLatest.Date) < new Date(update.Date)) {
            latesDocuments[measureId] = update;
        }
    }) 

    return Object.keys(latesDocuments).map((ldKey) => latesDocuments[ldKey])
}

  // Sort by full datetime (ascending)
const sortUpdateDates = (history: GenericUpdateItem[]) => {
    return history.sort((a, b) => new Date(b.Date).getTime() - new Date(a.Date).getTime())
}

  const sortAndGroupUpdates = (updates: GenericUpdateItem[]) => {
    return sortUpdateDates(updates) 
      .reduce((acc: DateGroupedUpdates, entry) => {
        const dateKey = new Date(entry.Date).toISOString().split("T")[0]; // Extract YYYY-MM-DD
  
        if (!acc[dateKey]) {
          acc[dateKey] = [];
        }
  
        acc[dateKey].push(entry);
        return acc;
      }, {}); // Group by date
  };

const addUpcomingImportantDate = (futureHistory: DateGroupedUpdates) => {
    const nextImportantDate = Object.keys(importantDates).find(date => {
        const today = getYYYYMMDD(new Date());
        return date >= today;
    })

    if(!nextImportantDate) return;
    if(futureHistory[nextImportantDate]) return;
    futureHistory[nextImportantDate] = [];
};

// Usage: Reverse sorting within each day
const getUpdatesSortedIntoDates = (updates: GenericUpdateItem[]) => {
    const groupedHistory = sortAndGroupUpdates(updates);

    addUpcomingImportantDate(groupedHistory);

    Object.keys(groupedHistory).forEach((date) => {
        groupedHistory[date].sort((a: GenericUpdateItem, b: GenericUpdateItem) => new Date(b.Date).getTime() - new Date(a.Date).getTime()); // Sort time descending
    });
    
    return groupedHistory;
};

