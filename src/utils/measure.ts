import { UserTrackedMeasure, UserTrackedMeasureWithSource } from "../types/MeasureTypes";
import { SESSION_KEY } from "./constants";

export const getMeasureUniqueId = (obj: { MeasurePrefix: string, MeasureNumber: number, SessionKey: string}) => {
    const {MeasurePrefix, MeasureNumber, SessionKey} = obj;
    return `${MeasurePrefix}-${MeasureNumber}-${SessionKey}`;
}

export const getReadableId = (obj: { MeasurePrefix: string, MeasureNumber: number}) => {
    const {MeasurePrefix, MeasureNumber} = obj;
    return `${MeasurePrefix} ${MeasureNumber}`;
}

export const parseUniqueId = (uniqueId: string) => {
    const [MeasurePrefix, MeasureNumber, SessionKey] = uniqueId.split('-');

    return {
        MeasurePrefix,
        MeasureNumber: Number(MeasureNumber),
        SessionKey,
    }
}

export const getMeasureIdentifierFilters = (id: string, sessionKey: string) => {
    const {measurePrefix, measureNumber} = getMeasurePrefixNumberFromId(id);
  
    return encodeURIComponent(
      `MeasureNumber eq ${measureNumber} and MeasurePrefix eq '${measurePrefix}' and SessionKey eq '${sessionKey}'`
    )
  }

  export const getMeasureFilters = (uniqueId: string) => {

    const {MeasurePrefix, MeasureNumber, SessionKey} = parseUniqueId(uniqueId);
  
    return encodeURIComponent(
      `MeasureNumber eq ${MeasureNumber} and MeasurePrefix eq '${MeasurePrefix}' and SessionKey eq '${SessionKey}'`
    )
  }

  export const getSessionKeyFilter = () => {
    return encodeURIComponent(
      `SessionKey eq '${SESSION_KEY}'`)
  }
  
export const getMeasurePrefixNumberFromId = (id: string) => {
    const splitId = id.split(' ');
    const measurePrefix = splitId[0];
    const measureNumber = splitId[1];
  
    return {
      measurePrefix, measureNumber
    }
  }


  export const sortMeasures = (measures: UserTrackedMeasure[]) => {
    return measures.sort((a, b) => {
      if(a.MeasurePrefix === b.MeasurePrefix) {
        return a.MeasureNumber - b.MeasureNumber;
      }
      return a.MeasurePrefix.localeCompare(b.MeasurePrefix);
    });
  }

  export const sortMeasuresMeasuresWithSource = (measures: UserTrackedMeasureWithSource[]) => {
    return measures.sort((a, b) => {
      if(a.MeasurePrefix === b.MeasurePrefix) {
        return a.MeasureNumber - b.MeasureNumber;
      }
      return a.MeasurePrefix.localeCompare(b.MeasurePrefix);
    });
  }