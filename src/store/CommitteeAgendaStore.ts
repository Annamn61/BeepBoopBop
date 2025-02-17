import { create } from 'zustand';
import { AgendaItem } from '../types/CommitteeAgendaTypes';

interface CommitteeAgendaState {
  unfilteredCommitteeAgenda: AgendaItem[][]; //Each Measure will return a list of AgendaItems so it is a double array of Measures and the corresponding Agenda Items
  setUnfilteredCommitteeAgenda: (agendaItems: AgendaItem[][]) => void;
  getCommitteeAgendaItems: () => AgendaItem[][];
};

export const useCommitteeAgendaStore = create<CommitteeAgendaState>((set, get) => ({
  unfilteredCommitteeAgenda: [],
  setUnfilteredCommitteeAgenda: (agendaItems) => set({ unfilteredCommitteeAgenda: agendaItems }),
  getCommitteeAgendaItems: () => get().unfilteredCommitteeAgenda,
}));

export default useCommitteeAgendaStore;