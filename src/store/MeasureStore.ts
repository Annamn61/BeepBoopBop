import { create } from 'zustand';
import { Measure, MeasureObject, UserTrackedMeasure } from '../types/MeasureTypes';
import { userTrackedMeasures } from '../data/userMeasureData';
import { getKanbanLocationFromBilLocation } from '../components/BillLocationBoard/Locations/Locations.helpers';
import { getMeasureId } from '../utils/measure';

interface MeasureState {
  userTrackedMeasures: UserTrackedMeasure[];
  setUserTrackedMeasures: (userTrackedMeasures: UserTrackedMeasure[]) => void;
  addUserTrackedMeasure: (newUserTrackedMeasure: UserTrackedMeasure) => void;
  getUserTrackedMeasurePositionById: (id: string) => UserTrackedMeasure['position'] | undefined;
  unfilteredMeasures: Measure[];
  setUserTrackedMeasureFilterStatusById: (id: string, isDisplayed: boolean) => void;
  toggleAllUserTrackedFilterStatusesBasedOnAnId: (id: string) => void;
  getMeasures: () => Measure[];
  getMeasuresSortedIntoKanbanLocations: () => any,
  getHasKanbanSortingError: () => boolean,
  setUnfilteredMeasures: (measures: MeasureObject[]) => void;
  getMeasureById: (id?: string) => Measure | undefined;
  getUserMeasureMetadataById: (id: string) => UserTrackedMeasure | undefined;
  getMeasureCommitteeNameById: (id: string) => string | undefined;
  getMeasureTitleById: (id: string) => string | undefined;
  getMeasureDocumentUrlById: (id: string) => string | undefined;
  getUserMeasureColorById: (id: string) => string | undefined;
  getUnfilteredMeasures: any;
}

export const useMeasureStore = create<MeasureState>((set, get) => ({
  userTrackedMeasures,
  setUserTrackedMeasures: (userTrackedMeasures: UserTrackedMeasure[]) => set({userTrackedMeasures}),
  addUserTrackedMeasure: (newUserTrackedMeasure: UserTrackedMeasure) => set({userTrackedMeasures: [...get().userTrackedMeasures, newUserTrackedMeasure]}),
  getUserTrackedMeasurePositionById: (id) => get().userTrackedMeasures.find((utm: UserTrackedMeasure) => utm.id === id)?.position,
  unfilteredMeasures: [],
  setUserTrackedMeasureFilterStatusById: (id, isDisplayed) => set({userTrackedMeasures: getUserTrackedMeasuresWithNewFilterStatus(get().userTrackedMeasures, id, isDisplayed)}),
  toggleAllUserTrackedFilterStatusesBasedOnAnId: (id) => set({userTrackedMeasures: getToggledFilters(get().userTrackedMeasures, id)}),
  getMeasures: () => getMeasuresFromFiltersAndUnfilteredMeasures(get().unfilteredMeasures, get().userTrackedMeasures),
  getMeasuresSortedIntoKanbanLocations: () => sortMeasuresIntoKanbanLocations(get().getMeasures()),
  getHasKanbanSortingError: () => getHasSortingError(get().getMeasuresSortedIntoKanbanLocations()),
  setUnfilteredMeasures: (measureObjects) => set({ unfilteredMeasures: getMeasuresFromMeasureObjects(measureObjects) }),
  getMeasureById: (id) => get().unfilteredMeasures.find((measure: Measure) =>  measure.id === id),
  getUserMeasureMetadataById: (id) => get().userTrackedMeasures.find((measure: UserTrackedMeasure) => measure.id === id),
  getMeasureCommitteeNameById: (id) => get().getMeasureById(id)?.CurrentCommitteeCode,
  getMeasureTitleById: (id) => get().getMeasureById(id)?.RelatingTo,
  getMeasureDocumentUrlById: (id) => get().getMeasureById(id)?.MeasureDocuments?.[0]?.DocumentUrl,
  getUserMeasureColorById: (id) => get().getUserMeasureMetadataById(id)?.color,
  getUnfilteredMeasures: () => get().unfilteredMeasures,
}));

const getToggledFilters = (userTrackedMeasures: UserTrackedMeasure[], id: string) => {
    let newTrackedMeasures: UserTrackedMeasure[] = [];
    const displayedMeasures = userTrackedMeasures.filter((measure) => measure.isDisplayed);
    if(displayedMeasures.length === 1 && displayedMeasures[0].id === id) {
        // turn all on
        userTrackedMeasures.forEach((measure) => {
            newTrackedMeasures.push({...measure, isDisplayed: true});
        })
    } else {
        // turn all off except for the id
        userTrackedMeasures.forEach((measure) => {
            if(measure.id === id) {
            newTrackedMeasures.push({...measure, isDisplayed: true})
            } else {
            newTrackedMeasures.push({...measure, isDisplayed: false});
            }
        })
    }
    
    return newTrackedMeasures
}


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
  const definedMeasures = measureObjects.filter(measure => measure !== undefined);
  const ret =  definedMeasures.filter(o => o.value[0]).map((obj) => {
    const measure = obj.value[0];
    const id = `${measure.MeasurePrefix} ${measure.MeasureNumber}`
    return {
      ...measure, 
      id
    }

  });
  return ret;
}

export default useMeasureStore;