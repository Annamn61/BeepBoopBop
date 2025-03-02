export interface MeasureObject {
    value: [Measure]
  }
  
export interface Measure {
    MeasureNumber: number,
    MeasurePrefix: 'HB' | 'SB' | 'HJM' | 'LC',
    CurrentCommitteeCode: string,
    CurrentLocation: string,
    RelatingTo: string,
    id: string,
    MeasureDocuments: MeasureDocument[],
    MeasureSponsors: MeasureSponsors[],
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

export interface MeasureSponsors {
    CommitteeCode: null | string,
    CreatedDate: string,
    LegislatoreCode: string,
    MeasureNumber: Measure['MeasureNumber'],
    MeasurePrefix: Measure['MeasurePrefix'],
    MeasureSponsorId: string,
    ModifiedDate: string | null,
    PresessionFiledMessage: any, // FIX
    PrintOrder: string, // ??
    SessionKey: string,
    SponsorLevel: string,
    SponsorType: string,
}

export interface UserTrackedMeasure {
    id: string, 
    position: 'Support' | 'Oppose' | '?',
    sessionKey: string,
    isDisplayed: boolean,
    color: string,
    nickname: string,
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

export interface GenericUpdateItem {
    Text: string;
    Date: string;
    MeasurePrefix: string;
    MeasureNumber: number;
    MeasureName: string | undefined;
    SessionKey: string;
    Link: string | null;
    Key: string;
    Type: 'MeasureHistoryItem' | 'MeasureDocument';
    CommitteeCode?: string,
}

export interface DateGroupedHistory {
    [date: string]: MeasureHistoryItem[]
}

export interface DateGroupedUpdates {
    [date: string]: GenericUpdateItem[]
}


