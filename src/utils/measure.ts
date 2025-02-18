export const getMeasureId = (MeasurePrefix: string, MeasureNumber: number) => {
    return `${MeasurePrefix} ${MeasureNumber}`
}

export const getMeasureIdentifierFilters = (id: string, sessionKey: string) => {
    const {measurePrefix, measureNumber} = getMeasurePrefixNumberFromId(id);
  
    return encodeURIComponent(
      `MeasureNumber eq ${measureNumber} and MeasurePrefix eq '${measurePrefix}' and SessionKey eq '${sessionKey}'`
    )
  }
  
export const getMeasurePrefixNumberFromId = (id: string) => {
    const splitId = id.split(' ');
    const measurePrefix = splitId[0];
    const measureNumber = splitId[1];
  
    return {
      measurePrefix, measureNumber
    }
  }