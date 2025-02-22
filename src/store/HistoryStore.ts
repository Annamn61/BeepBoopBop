import { create } from 'zustand';
import { useMeasureStore } from './MeasureStore';
import { Measure } from '../types/MeasureTypes';
import { getMeasureId } from '../utils/measure';
// useMeasureStore.getState().filteredMeasures;

interface HistoryState {
  unfilteredHistory: {ActionDate: string, MeasurePrefix: string, MeasureNumber: number}[]; //Todo: update any
  setUnfilteredHistory: (history: any[]) => void;
  getFilteredHistory: () => {ActionDate: string}[];
//   activeHistoryItems: any[]; //Todo: update any
  getFilteredHistorySortedByDate: () => any[];
}

export const useHistoryStore = create<HistoryState>((set, get) => ({
    unfilteredHistory: [],
    setUnfilteredHistory: (historyObjects) => set({ unfilteredHistory: historyObjects }),
    getFilteredHistory: () => filterHistoryToFilteredMeasures(get().unfilteredHistory, useMeasureStore.getState().getFilteredMeasureIds()),
//   filteredHistoryItemsByFilteredMeasures: [],
    getFilteredHistorySortedByDate: () => getHistorySortedIntoDates(get().getFilteredHistory()), //TODO actually use a filtered history 
}));


export default useHistoryStore;

const filterHistoryToFilteredMeasures = (history: {MeasurePrefix: string, MeasureNumber: number, ActionDate: string}[], filteredIds: Measure['id'][]) => {
    
    console.log('ON items', filteredIds);

    return history.filter((historyItem) => {
        const id = getMeasureId(historyItem.MeasurePrefix, historyItem.MeasureNumber);
        return filteredIds.includes(id);
    })
    
}

const sortAndGroupHistory = (history: any[]) => {
    return history
      .sort((a, b) => new Date(b.ActionDate).getTime() - new Date(a.ActionDate).getTime()) // Sort by full datetime (ascending)
      .reduce((acc, entry) => {
        const dateKey = new Date(entry.ActionDate).toISOString().split("T")[0]; // Extract YYYY-MM-DD
  
        if (!acc[dateKey]) {
          acc[dateKey] = [];
        }
  
        acc[dateKey].push(entry);
        return acc;
      }, {}); // Group by date
  };
  
  // Usage: Reverse sorting within each day
  const getHistorySortedIntoDates = (history: any[]) => {
    const groupedHistory = sortAndGroupHistory(history);
  
    Object.keys(groupedHistory).forEach((date) => {
      groupedHistory[date].sort((a: { ActionDate: string | number | Date; }, b: { ActionDate: string | number | Date; }) => new Date(b.ActionDate).getTime() - new Date(a.ActionDate).getTime()); // Sort time descending
    });
  
    return groupedHistory;
  };