import { create } from 'zustand';
import { Legislator } from '../types/LegislatorTypes';

interface LegislatorState {
  legislators: Legislator[];
  setLegislators: (legislators: Legislator[]) => void;
  addLegislator: (newLegislator: Legislator) => void;
  setUnfilteredLegislators: (legislators: Legislator[]) => void;
  
  getLegislatorByCode: (code: string) => Legislator | undefined;
  getFullLegislatorNameByCode: (code: string) => string | undefined;
}

export const useLegislatorStore = create<LegislatorState>((set, get) => ({
  legislators: [],
  setLegislators: (legislators: Legislator[]) => set({ legislators }),
  addLegislator: (newLegislator: Legislator) => set({ legislators: [...get().legislators, newLegislator] }),
  setUnfilteredLegislators: (legislators: Legislator[]) => set({ legislators }),

  getLegislatorByCode: (code: string) => get().legislators?.find((legislator) => legislator.LegislatorCode === code),
  getFullLegislatorNameByCode: (code: string) => {
    const legislator = get().legislators?.find((legislator) => legislator.LegislatorCode === code);
    return legislator ? `${legislator.FirstName} ${legislator.LastName}` : undefined;
  },
}));

export default useLegislatorStore;