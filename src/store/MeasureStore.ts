import { create } from 'zustand';
import { Measure, MeasureDocument, MeasureObject, MeasureSponsors, UserTrackedMeasure } from '../types/MeasureTypes';
import { getKanbanLocationFromBilLocation } from '../components/Pages/BillLocationBoard/Locations/Locations.helpers';
import { useUserStore } from './UserStore';
import { getMeasureUniqueId } from '../utils/measure';

interface MeasureState {
  /** Get an array of the ids of measures filtered as 'on' by the user */
  getFilteredMeasureIds: () => Measure['id'][];
  /** Returns all the measure documents for measures that are displayed */
  getFilteredMeasureDocuments: () => MeasureDocument[];
  /** The total set of measures  a user is tracking */
  unfilteredMeasures: Measure[];
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
  /**  Get the committee code for the committee a measure is currently in, by id */
  getMeasureCommitteeCodeById: (id: string) => string | undefined;
  /** Get all the measure documents from a measure's id */
  getMeasureDocumentsById: (id: string) => MeasureDocument[] | undefined;
  /** Get the title of the measure by its id */
  getMeasureTitleById: (id: string) => string | undefined;
  /** gets the user definied nickname of an id, catchline otherwise */
  getMeasureNicknameById: (id: string) => string | undefined;
  /** gets the sponsors that are members, sorted by print order */
  getSortedMeasureSponsorsById: (id: string | undefined) => MeasureSponsors[]
  /** gets the sponsors that are members, sorted by print order */
  getSortedMeasureChiefSponsorsById: (id: string | undefined) => MeasureSponsors[]
}

export const useMeasureStore = create<MeasureState>((set, get) => ({
  getFilteredMeasureIds: () => (useUserStore.getState().userTrackedMeasures) ? (useUserStore.getState().getSafeUserTrackedMeasures()).filter((m) =>m.isDisplayed).map((measure) => getMeasureUniqueId(measure)) : [],
  getFilteredMeasureDocuments: () => get().getMeasures().flatMap((measure) => measure.MeasureDocuments),
  unfilteredMeasures: [],
  getMeasures: () => getMeasuresFromFiltersAndUnfilteredMeasures(get().unfilteredMeasures, useUserStore.getState().getSafeUserTrackedMeasures()),
  getMeasuresSortedIntoKanbanLocations: () => sortMeasuresIntoKanbanLocations(get().getMeasures()),
  getHasKanbanSortingError: () => getHasSortingError(get().getMeasuresSortedIntoKanbanLocations()),
  setUnfilteredMeasures: (measureObjects) => set({ unfilteredMeasures: getMeasuresFromMeasureObjects(measureObjects) }),
  getMeasureById: (id) => get().unfilteredMeasures.find((measure: Measure) =>  measure.id === id),
  getMeasureUrlById:  (id) => getMeasureUrl(get().getMeasureById(id)),
  getMeasureCommitteeCodeById: (id) => get().getMeasureById(id)?.CurrentCommitteeCode,
  getMeasureDocumentsById: (id) => get().getMeasureById(id)?.MeasureDocuments,
  getMeasureTitleById: (id) => get().getMeasureById(id)?.CatchLine,
  getMeasureNicknameById: (id) => useUserStore.getState().getUserMeasureMetadataById(id)?.nickname || get().getMeasureById(id)?.CatchLine || undefined,
  getSortedMeasureSponsorsById: (id) => sortSponsors(get().getMeasureById(id)?.MeasureSponsors),
  getSortedMeasureChiefSponsorsById: (id) => sortChiefSponsors(get().getMeasureById(id)?.MeasureSponsors)
}));

const sortChiefSponsors = (sponsors: MeasureSponsors[] | undefined) => {
    if(!sponsors) return []

    return sponsors.filter((s) => s.SponsorType === 'Member' && s.SponsorLevel === 'Chief').sort((a, b) => Number(b.PrintOrder) - Number(a.PrintOrder) )
}


const sortSponsors = (sponsors: MeasureSponsors[] | undefined) => {
    if(!sponsors) return []

    return sponsors.filter((s) => s.SponsorType === 'Member' && s.SponsorLevel === 'Regular').sort((a, b) => Number(b.PrintOrder) - Number(a.PrintOrder) )
}

const getMeasureUrl = (measure?: Measure) => {
    if(!measure) return '';

    return `https://olis.oregonlegislature.gov/liz/${measure.SessionKey}/Measures/Overview/${measure.MeasurePrefix}${measure.MeasureNumber}`
}

const getMeasuresFromFiltersAndUnfilteredMeasures = (unfilteredMeasures: Measure[], userTrackedMeasures: UserTrackedMeasure[]) => {
  return unfilteredMeasures.filter(unfilteredMeasure => {
    const isDisplayed = userTrackedMeasures.find((userTrackedMeasure) => getMeasureUniqueId(unfilteredMeasure) === getMeasureUniqueId(userTrackedMeasure))?.isDisplayed;
    return isDisplayed ? unfilteredMeasure : null;
  })
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
    const id = getMeasureUniqueId(measure);
    return {
      ...measure, 
      id
    }

  });
  return ret;
}

export default useMeasureStore;