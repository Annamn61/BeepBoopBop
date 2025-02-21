export interface MeasureObject {
    value: [Measure]
  }

export interface HistoryObject {
    value: [History]
}
  
export interface Measure {
    MeasureNumber: number,
    MeasurePrefix: 'HB' | 'SB' | 'HJM' | 'LC',
    CurrentCommitteeCode: string,
    CurrentLocation: string,
    RelatingTo: string,
    id: string,
    MeasureDocuments: MeasureDocument[],
    MeasureHistoryActions: MeasureHistoryItem[],
    AtTheRequestOf: string,
    CatchLine: string,
    ChapterNumber: number, 
    CreatedDate: string,
    CurrentSubCommittee: string,
    CurrentVersion: any, // TODO FiX
    EffectiveDate: string,
    EmergencyClause: boolean, // TODO Fix
    FiscalAnalyst: string,
    FiscalImpact: string,
    LCNumber: number,
    MeasureSummary: string,
    MinorityCatchLine: string | null,
    ModifiedDate: string,
    PrefixMeaning: string,
    RelatingToFull: "Relating to sustainable investing.\n\t",
    RevenueEconomist: string,
    RevenueImpact: string,
    SessionKey: string,
    Vetoed: boolean,
}

export interface UserTrackedMeasure {
    id: string, 
    position: 'Support' | 'Oppose',
    sessionKey: string,
    isDisplayed: boolean,
    color: string,
}

export interface MeasureLocalStorage {
    lastUpdated: string,
    measures: MeasureObject[], 
    history: MeasureHistoryItem[],
}

export interface MeasureDocument {
    CreatedDate: string;  // ISO date string
    DocumentUrl: string;
    MeasureNumber: number;
    MeasurePrefix: string;
    ModifiedDate: string | null;
    SessionKey: string;
    VersionDescription: string;
}

export interface MeasureHistoryItem {
    ActionDate: string; // ISO date string
    ActionText: string;
    Chamber: string;
    CreatedDate: string; // ISO date string
    MeasureHistoryId: number;
    MeasureNumber: number;
    MeasurePrefix: string;
    ModifiedDate: string | null;
    PublicNotification: boolean;
    SessionKey: string;
    VoteText: string | null;
}

