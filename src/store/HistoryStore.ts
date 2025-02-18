import { create } from 'zustand';

interface HistoryState {
  unfilteredHistory: {ActionDate: string}[]; //Todo: update any
  setUnfilteredHistory: (history: any[]) => void;
//   activeHistoryItems: any[]; //Todo: update any
  getFilteredHistorySortedByDate: () => any[];
}

export const useHistoryStore = create<HistoryState>((set, get) => ({
    unfilteredHistory: [],
    setUnfilteredHistory: (historyObjects) => set({ unfilteredHistory: historyObjects }),
//   filteredHistoryItemsByFilteredMeasures: [],
    getFilteredHistorySortedByDate: () => getHistorySortedIntoDates(get().unfilteredHistory), //TODO actually use a filtered history 
}));


export default useHistoryStore;

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