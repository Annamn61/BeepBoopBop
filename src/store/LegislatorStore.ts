import { create } from 'zustand';
import { Legislator } from '../types/LegislatorTypes';

interface LegislatorState {
  legislators: Legislator[];
  setLegislators: (legislators: Legislator[]) => void;
  addLegislator: (newLegislator: Legislator) => void;
  setUnfilteredLegislators: (legislators: Legislator[]) => void;
  
  getLegislatorByCode: (code: string) => Legislator | undefined;
  getFullLegislatorNameByCode: (code: string) => string;
  getFullLegislatorNameByCodeWithTitle: (code: string) => string;
  getEmailByLegislatorCode: (code: string) => string | undefined;
  getWebsiteByLegislatorCode: (code: string) => string | undefined;
  exportLegislatorContactsAsCSV: (codes: string[]) => string;
}

export const useLegislatorStore = create<LegislatorState>((set, get) => ({
  legislators: [],
  setLegislators: (legislators: Legislator[]) => set({ legislators }),
  addLegislator: (newLegislator: Legislator) => set({ legislators: [...get().legislators, newLegislator] }),
  setUnfilteredLegislators: (legislators: Legislator[]) => set({ legislators }),

  getLegislatorByCode: (code: string) => get().legislators?.find((legislator) => legislator.LegislatorCode === code),
  getFullLegislatorNameByCode: (code: string) => {
    const legislator = get().legislators?.find((legislator) => legislator.LegislatorCode === code);
    return legislator ? `${legislator.FirstName} ${legislator.LastName}` : 'undefined';
  },
  getFullLegislatorNameByCodeWithTitle: (code: string) => {
    const legislator = get().legislators?.find((legislator) => legislator.LegislatorCode === code);
    return legislator ? `${legislator.Title.slice(0, 3)} ${legislator.FirstName} ${legislator.LastName}` : 'undefined';
  },
  getEmailByLegislatorCode: (code: string) => {
    const legislator = get().legislators?.find((legislator) => legislator.LegislatorCode === code);
    return legislator ? legislator.EmailAddress : undefined;
  },
  getWebsiteByLegislatorCode: (code: string) => {
    const legislator = get().legislators?.find((legislator) => legislator.LegislatorCode === code);
    return legislator ? legislator.WebSiteUrl : undefined;
  },
  exportLegislatorContactsAsCSV: (codes: string[]) => {
    const legislators = get().legislators.filter(legislator => codes.includes(legislator.LegislatorCode));
    const header = "FirstName,LastName,Title,CapitolPhone,EmailAddress\n";
    const rows = legislators.map(legislator => 
      `${legislator.FirstName},${legislator.LastName},${legislator.Title},${legislator.CapitolPhone},${legislator.EmailAddress}`
    ).join("\n");
    return header + rows;
  }
}));

export default useLegislatorStore;