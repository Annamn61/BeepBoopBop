import { create } from 'zustand';
import { Measure, MeasureObject, UserTrackedMeasure } from '../types/MeasureTypes';
import { userTrackedMeasures } from '../data/userMeasureData';
import { getKanbanLocationFromBilLocation } from '../components/BillLocationBoard/Locations/Locations.helpers';

interface MeasureState {
  userTrackedMeasures: UserTrackedMeasure[];
  setUserTrackedMeasures: (userTrackedMeasures: UserTrackedMeasure[]) => void;
  getUserTrackedMeasurePositionById: (id: string) => UserTrackedMeasure['position'] | undefined;
  unfilteredMeasures: Measure[];
  setUserTrackedMeasureFilterStatusById: (id: string, isDisplayed: boolean) => void;
  getMeasures: () => Measure[];
  getMeasuresSortedIntoKanbanLocations: () => any,
  getHasKanbanSortingError: () => boolean,
  setUnfilteredMeasures: (measures: MeasureObject[]) => void;
  getMeasureById: (id: string) => Measure | undefined;
  getUserMeasureMetadataById: (id: string) => UserTrackedMeasure | undefined;
  getMeasureCommitteeNameById: (id: string) => string | undefined;
  getMeasureTitleById: (id: string) => string | undefined;
  getMeasureDocumentUrlById: (id: string) => string | undefined;
  getUserMeasureColorById: (id: string) => string | undefined;
}

export const useBillStore = create<MeasureState>((set, get) => ({
  userTrackedMeasures,
  setUserTrackedMeasures: (userTrackedMeasures: UserTrackedMeasure[]) => set({userTrackedMeasures}),
  getUserTrackedMeasurePositionById: (id) => get().userTrackedMeasures.find((utm: UserTrackedMeasure) => utm.id === id)?.position,
  unfilteredMeasures: [],
  setUserTrackedMeasureFilterStatusById: (id, isDisplayed) => set({userTrackedMeasures: getUserTrackedMeasuresWithNewFilterStatus(get().userTrackedMeasures, id, isDisplayed)}),
  getMeasures: () => getMeasuresFromFiltersAndUnfilteredMeasures(get().unfilteredMeasures, get().userTrackedMeasures),
  getMeasuresSortedIntoKanbanLocations: () => sortMeasuresIntoKanbanLocations(get().getMeasures()),
  getHasKanbanSortingError: () => getHasSortingError(get().getMeasuresSortedIntoKanbanLocations()),
  setUnfilteredMeasures: (measureObjects) => set({ unfilteredMeasures: getMeasuresFromMeasureObjects(measureObjects) }),
  getMeasureById: (id) => get().unfilteredMeasures.find((measure: Measure) => measure.id === id),
  getUserMeasureMetadataById: (id) => get().userTrackedMeasures.find((measure: UserTrackedMeasure) => measure.id === id),
  getMeasureCommitteeNameById: (id) => get().getMeasureById(id)?.CurrentCommitteeCode,
  getMeasureTitleById: (id) => get().getMeasureById(id)?.RelatingTo,
  getMeasureDocumentUrlById: (id) => get().getMeasureById(id)?.MeasureDocuments?.[0]?.DocumentUrl,
  getUserMeasureColorById: (id) => get().getUserMeasureMetadataById(id)?.color,
}));


const getMeasuresFromFiltersAndUnfilteredMeasures = (unfilteredMeasures: Measure[], userTrackedMeasures: UserTrackedMeasure[]) => {
  return unfilteredMeasures.filter(unfilteredMeasure => {
    const isDisplayed = userTrackedMeasures.find((userTrackedMeasure) => unfilteredMeasure.id === userTrackedMeasure.id)?.isDisplayed;
    return isDisplayed ? unfilteredMeasure : null;
  })
}

const getUserTrackedMeasuresWithNewFilterStatus = (userTrackedMeasures: UserTrackedMeasure[], id: string, isDisplayed: boolean) => {
  let newTrackedMeasures: UserTrackedMeasure[] = [];
  userTrackedMeasures.forEach((measure) => {
    if(measure.id === id) {
      newTrackedMeasures.push({...measure, isDisplayed})
    } else {
      newTrackedMeasures.push(measure);
    }
  })
  return newTrackedMeasures
}

const getHasSortingError = (sortedObject: any) => {
  return !!sortedObject?.['Sorting Errors']
}

const sortMeasuresIntoKanbanLocations = (measures: Measure[]) => {
  let tempBillsInLocations: any = {}
  if(measures) {
    measures.forEach((measure) => {
      let {group, section, status, sublocation} = getKanbanLocationFromBilLocation(measure.CurrentLocation, measure.MeasurePrefix);
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