import { Committee } from "./CommitteeTypes";
import { Legislator } from "./LegislatorTypes";
import { MeasureObject } from "./MeasureTypes";

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
    value: Committee[],
    lastUpdate: string,
}

export interface LocalStorageLegislatorCache {
    value: Legislator[],
    lastUpdate: string,
}
