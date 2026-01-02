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
  getLegislatorPartyByCode: (code: string) => string | undefined;
}

export const useLegislatorStore = create<LegislatorState>((set, get) => ({
  legislators: [],
  setLegislators: (legislators: Legislator[]) => set({ legislators }),
  addLegislator: (newLegislator: Legislator) => set({ legislators: [...get().legislators, newLegislator] }),
  setUnfilteredLegislators: (legislators: Legislator[]) => set({ legislators }),

  getLegislatorByCode: (code: string) => {
    const legislators = get().legislators || [];
    // Try exact match first
    let legislator = legislators.find((legislator) => legislator?.LegislatorCode?.toLowerCase() === code?.toLowerCase());

    if (code === 'Rep Neron') {
        legislator = legislators.find((legislator) => legislator.LegislatorCode === 'Sen Neron Misslin');
        console.log('NERON URL', legislator?.WebSiteUrl);
    }
    
    // Debug logging if not found
    if (!legislator) {
        // TODO: Log errors to error reporting for this code
        // KNOWN ISSUE: Representative moving to senate with break code check (Rep X -> Sen X)
      console.warn(`Legislator not found for code: "${code}". Available codes:`);
    }
    
    return legislator;
  },
  getFullLegislatorNameByCode: (code: string) => {
    const legislator = get().legislators?.find((legislator) => legislator.LegislatorCode === code);
    return legislator ? `${legislator.FirstName} ${legislator.LastName}` : code;
  },
  getFullLegislatorNameByCodeWithTitle: (code: string) => {
    const legislator = get().legislators?.find((legislator) => legislator.LegislatorCode === code);
    return legislator ? `${legislator.Title.slice(0, 3)} ${legislator.FirstName} ${legislator.LastName}` : code;
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
  },
  getLegislatorPartyByCode: (code: string) => {
    return get().getLegislatorByCode(code)?.Party;
  }
}));

export default useLegislatorStore;