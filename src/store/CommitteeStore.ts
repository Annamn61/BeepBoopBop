import { create } from 'zustand';
import { Committee } from '../types/CommitteeTypes';

interface CommitteeState {
  committees: Committee[];
  setCommittees: (committees: Committee[]) => void;
  addCommittee: (newCommittee: Committee) => void;
  setUnfilteredCommittees: (committees: Committee[]) => void;
  getCommitteeByCode: (code: string) => Committee | undefined;
  getFullCommitteeNameByCode: (code: string) => string | undefined;
}

export const useCommitteeStore = create<CommitteeState>((set, get) => ({
  committees: [],
  setCommittees: (committees: Committee[]) => set({ committees }),
  addCommittee: (newCommittee: Committee) => set({ committees: [...get().committees, newCommittee] }),
  setUnfilteredCommittees: (committees: Committee[]) => set({ committees }),
  getCommitteeByCode: (code: string) => get().committees?.find((committee) => committee.CommitteeCode === code),
  getFullCommitteeNameByCode: (code: string) => get().committees?.find((committee) => committee.CommitteeCode === code)?.CommitteeName,
}));

export default useCommitteeStore;