import { create } from 'zustand';
import { AgendaItem } from '../types/CommitteeAgendaTypes';

interface CommitteeAgendaState {
  unfilteredCommitteeAgenda: AgendaItem[];
  setUnfilteredCommitteeAgenda: (agendaItems: AgendaItem[]) => void;
  getCommitteeAgendaItems: () => AgendaItem[];
  getCalendarEvents: () => { title: string; start: Date; end: Date; measureNumber: number; comments: string }[];
};

export const useCommitteeAgendaStore = create<CommitteeAgendaState>((set, get) => ({
  unfilteredCommitteeAgenda: [],
  setUnfilteredCommitteeAgenda: (agendaItems) => set({ unfilteredCommitteeAgenda: agendaItems }),
  getCommitteeAgendaItems: () => get().unfilteredCommitteeAgenda,
  getCalendarEvents: () =>
    get()
      .unfilteredCommitteeAgenda.map(item => ({
        title: item.MeetingType,
        start: new Date(item.MeetingDate),
        end: new Date(item.MeetingDate),
        measureNumber: item.MeasureNumber,
        comments: item.Comments,
      })),
}));

export default useCommitteeAgendaStore;