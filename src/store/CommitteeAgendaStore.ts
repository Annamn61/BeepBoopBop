import { create } from 'zustand';
import { AgendaItem } from '../types/CommitteeAgendaTypes';
import { userTrackedMeasures } from '../data/userMeasureData';
import { getMeasureId } from '../utils/measure';

interface CommitteeAgendaState {
  unfilteredCommitteeAgenda: AgendaItem[];
  setUnfilteredCommitteeAgenda: (agendaItems: AgendaItem[]) => void;
  getCommitteeAgendaItems: () => AgendaItem[];
  getCalendarEvents: () => { title: string; start: Date; end: Date; id: string; comments: string; color: string }[];
};

export const useCommitteeAgendaStore = create<CommitteeAgendaState>((set, get) => ({
  unfilteredCommitteeAgenda: [],
  setUnfilteredCommitteeAgenda: (agendaItems) => set({ unfilteredCommitteeAgenda: agendaItems }),
  getCommitteeAgendaItems: () => get().unfilteredCommitteeAgenda,
  getCalendarEvents: () =>
    get()
      .unfilteredCommitteeAgenda.flat() // Flatten the double array into a single array of AgendaItems
      .map(item => {
        // Find the matching measure in userTrackedMeasures
        const trackedMeasure = userTrackedMeasures.find(measure => measure.id === `HB ${item.MeasureNumber}`); 
      
        return {
          title: item.MeetingType,
          start: new Date(item.MeetingDate),
          end: new Date(item.MeetingDate),
          id: getMeasureId(item.MeasurePrefix, item.MeasureNumber),
          comments: item.Comments,
          color: trackedMeasure ? trackedMeasure.color : "#000000" // Use tracked color or default
        };
      }),
}));

export default useCommitteeAgendaStore;