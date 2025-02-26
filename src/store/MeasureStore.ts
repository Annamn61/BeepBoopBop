import { create } from 'zustand';
import { Measure, MeasureDocument, MeasureObject, UserTrackedMeasure } from '../types/MeasureTypes';
import { userTrackedMeasures } from '../data/userMeasureData';
import { getKanbanLocationFromBilLocation } from '../components/BillLocationBoard/Locations/Locations.helpers';
import { getUniqueMeasureIdentifier } from '../data/cache/cache';

interface MeasureState {
 /** Metadata about the measures a user is tracking */
  userTrackedMeasures: UserTrackedMeasure[];
  /** set the metadata about the measures a user is tracking */
  setUserTrackedMeasures: (userTrackedMeasures: UserTrackedMeasure[]) => void;
  /** Add a single measure's metadata for tracking  */
  addUserTrackedMeasure: (newUserTrackedMeasure: UserTrackedMeasure) => void;
  /** Returns a string array of the ids of the user tracked measures */
  getUserTrackedMeasureUniqueIds: () => string[];
  /** remove a measure's metadata from the list of what to track */
  removeTrackedMeasureById: (id: string) => void;
  /**  Get the users position on a bill by its id */
  getUserTrackedMeasurePositionById: (id: string) => UserTrackedMeasure['position'] | undefined;
  /** Get an array of the ids of measures filtered as 'on' by the user */
  getFilteredMeasureIds: () => Measure['id'][];
  /** Returns all the measure documents for measures that are displayed */
  getFilteredMeasureDocuments: () => MeasureDocument[];
  /** The total set of measures  a user is tracking */
  unfilteredMeasures: Measure[];
  /** Update whether a measure is filtered or not by id */
  setUserTrackedMeasureFilterStatusById: (id: string, isDisplayed: boolean) => void;
  /**  Toggle all measures as filtered on or off except for this id */
  toggleAllUserTrackedFilterStatusesBasedOnAnId: (id: string) => void;
  /** Get all the measures filtered 'on' */
  getMeasures: () => Measure[];
  /** Gets the measures in groupings of where they live in the location kanban */
  getMeasuresSortedIntoKanbanLocations: () => any,
  /** Trus if any bill gives an error to the kanban sorting, false otherwise */
  getHasKanbanSortingError: () => boolean,
  /** Set the measure data for all of the measures a user is tracking */
  setUnfilteredMeasures: (measures: MeasureObject[]) => void;
  /** Get a single measure's data by id */
  getMeasureById: (id?: string) => Measure | undefined;
  /** Returns the link to the measure in OLIS */
  getMeasureUrlById: (id?: string) => string;
  /** Get the user tracked measure metadata for a user's measure by id */
  getUserMeasureMetadataById: (id: string) => UserTrackedMeasure | undefined;
  /**  Get the committee code for the committee a measure is currently in, by id */
  getMeasureCommitteeCodeById: (id: string) => string | undefined;
  /** Get all the measure documents from a measure's id */
  getMeasureDocumentsById: (id: string) => MeasureDocument[] | undefined;
  /** Get the title of the measure by its id */
  getMeasureTitleById: (id: string) => string | undefined;
  /** Gets the user defined color of a measure by its id */
  getUserMeasureColorById: (id: string) => string | undefined;
}

export const useMeasureStore = create<MeasureState>((set, get) => ({
  userTrackedMeasures,
  setUserTrackedMeasures: (userTrackedMeasures: UserTrackedMeasure[]) => set({userTrackedMeasures}),
  addUserTrackedMeasure: (newUserTrackedMeasure: UserTrackedMeasure) => set({userTrackedMeasures: [...get().userTrackedMeasures, newUserTrackedMeasure]}),
  getUserTrackedMeasureUniqueIds: () => get().userTrackedMeasures.map((measure) => getUniqueMeasureIdentifier(measure.id, measure.sessionKey)),
  removeTrackedMeasureById: (id) => set({userTrackedMeasures: userTrackedMeasures.filter((measure) => measure.id != id)}),
  getUserTrackedMeasurePositionById: (id) => get().userTrackedMeasures.find((utm: UserTrackedMeasure) => utm.id === id)?.position,
  getFilteredMeasureIds: () => get().userTrackedMeasures.filter((m) =>m.isDisplayed).map((measure) => measure.id),
  getFilteredMeasureDocuments: () => get().getMeasures().flatMap((measure) => measure.MeasureDocuments),
  unfilteredMeasures: [],
  setUserTrackedMeasureFilterStatusById: (id, isDisplayed) => set({userTrackedMeasures: getUserTrackedMeasuresWithNewFilterStatus(get().userTrackedMeasures, id, isDisplayed)}),
  toggleAllUserTrackedFilterStatusesBasedOnAnId: (id) => set({userTrackedMeasures: getToggledFilters(get().userTrackedMeasures, id)}),
  getMeasures: () => getMeasuresFromFiltersAndUnfilteredMeasures(get().unfilteredMeasures, get().userTrackedMeasures),
  getMeasuresSortedIntoKanbanLocations: () => sortMeasuresIntoKanbanLocations(get().getMeasures()),
  getHasKanbanSortingError: () => getHasSortingError(get().getMeasuresSortedIntoKanbanLocations()),
  setUnfilteredMeasures: (measureObjects) => set({ unfilteredMeasures: getMeasuresFromMeasureObjects(measureObjects) }),
  getMeasureById: (id) => get().unfilteredMeasures.find((measure: Measure) =>  measure.id === id),
  getMeasureUrlById:  (id) => getMeasureUrl(get().getMeasureById(id)),
  getUserMeasureMetadataById: (id) => get().userTrackedMeasures.find((measure: UserTrackedMeasure) => measure.id === id),
  getMeasureCommitteeCodeById: (id) => get().getMeasureById(id)?.CurrentCommitteeCode,
  getMeasureDocumentsById: (id) => get().getMeasureById(id)?.MeasureDocuments,
  getMeasureTitleById: (id) => get().getMeasureById(id)?.CatchLine,
  getUserMeasureColorById: (id) => get().getUserMeasureMetadataById(id)?.color,
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

const getMeasureUrl = (measure?: Measure) => {
    if(!measure) return '';

    return `https://olis.oregonlegislature.gov/liz/${measure.SessionKey}/Measures/Overview/${measure.MeasurePrefix}${measure.MeasureNumber}`
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