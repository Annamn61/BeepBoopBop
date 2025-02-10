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
    MeasureDocuments: any, //TODO fix this
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