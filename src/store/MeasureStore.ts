import { create } from 'zustand';
import { Measure, MeasureObject, UserTrackedMeasure } from '../types/MeasureTypes';
import { userTrackedMeasures } from '../data/userMeasureData';
import { getKanbanLocationFromBilLocation } from '../components/BillLocationBoard/Locations/Locations.helpers';

interface MeasureState {
  userTrackedMeasures: UserTrackedMeasure[];
  getUserTrackedMeasurePositionById: (id: string) => UserTrackedMeasure['position'] | undefined;
  measures: Measure[];
  getMeasuresSortedIntoKanbanLocations: () => any,
  setMeasures: (measures: MeasureObject[]) => void;
  getMeasureById: (id: string) => Measure | undefined;
  getMeasureCommitteeNameById: (id: string) => string | undefined;
  getMeasureTitleById: (id: string) => string | undefined;
  getMeasureDocumentUrlById: (id: string) => string | undefined;
}

export const useBillStore = create<MeasureState>((set, get) => ({
  userTrackedMeasures,
  getUserTrackedMeasurePositionById: (id) => get().userTrackedMeasures.find((utm: UserTrackedMeasure) => utm.id === id)?.position,
  measures: [],
  getMeasuresSortedIntoKanbanLocations: () => getMeasuresSortedIntoKanbanLocations(get().measures),
  setMeasures: (measureObjects) => set({ measures: getMeasuresFromMeasureObjects(measureObjects) }),
  getMeasureById: (id) => get().measures.find((measure: Measure) => measure.id === id),
  getMeasureCommitteeNameById: (id) => get().getMeasureById(id)?.CurrentCommitteeCode,
  getMeasureTitleById: (id) => get().getMeasureById(id)?.RelatingTo,
  getMeasureDocumentUrlById: (id) => get().getMeasureById(id)?.MeasureDocuments?.[0]?.DocumentUrl,
}));

const getMeasuresSortedIntoKanbanLocations = (measures: Measure[]) => {
  let tempBillsInLocations: any = {}
  if(measures) {
    measures.forEach(measure => {
      const {group, section, status, sublocation} = getKanbanLocationFromBilLocation(measure.CurrentLocation, measure.MeasurePrefix);
      tempBillsInLocations[group] = tempBillsInLocations[group] || {};
      tempBillsInLocations[group][section] = tempBillsInLocations[group][section] || {}
      tempBillsInLocations[group][section][status] = tempBillsInLocations[group][section][status] || {}
      tempBillsInLocations[group][section][status][sublocation] = tempBillsInLocations[group][section][status][sublocation] || []
      tempBillsInLocations[group][section][status][sublocation] = [...tempBillsInLocations[group][section][status][sublocation], measure];  
    })
  }
  return tempBillsInLocations;
}

const getMeasuresFromMeasureObjects = (measureObjects: MeasureObject[]) => {
  const ret =  measureObjects.filter(o => o.value[0]).map((obj) => {
    const measure = obj.value[0];
    const id = `${measure.MeasurePrefix} ${measure.MeasureNumber}`
    return {
      ...measure, 
      id
    }

  });
  return ret;
}

export default useBillStore;