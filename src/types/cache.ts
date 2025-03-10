import { MeasureObject } from "./MeasureTypes";
import { Committee } from "./CommitteeTypes";

export interface LocalStoreageMeasureCache {
    [uniqueMeasureId: UniqueMeasureIdentifier] : MeasureCacheObject;
}

export interface MeasureCacheObject {
    MeasureData: MeasureObject,
    CommitteeAgendaItems: any,
    lastUpdate: string,
}

export type UniqueMeasureIdentifier = string;
export type MeasurePrefix = string;
export type MeasureNumber = number;
export type SessionKey = string;

export interface LocalStorageCommitteeCache {
    [uniqueCommitteeId: string]: CommitteeCacheObject;
}

export interface CommitteeCacheObject {
    CommitteeData: Committee,
    lastUpdate: string,
}
