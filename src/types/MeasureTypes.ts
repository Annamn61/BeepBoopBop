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
    MeasureHistoryActions: MeasureHistoryItem[],
}

export interface UserTrackedMeasure {
    id: string, 
    position: 'Support' | 'Oppose',
    sessionKey: string,
    isDisplayed: boolean,
}

export interface MeasureLocalStorage {
    lastUpdated: string,
    measures: MeasureObject[], 
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

