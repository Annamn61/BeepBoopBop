import { create } from "zustand";
import { UserTrackedMeasure } from "../types/MeasureTypes";
import { getMeasureUniqueId } from "../utils/measure";

interface UserState {
    /** Metadata about the measures a user is tracking */
    userTrackedMeasures: UserTrackedMeasure[] | undefined;
    getSafeUserTrackedMeasures: () => UserTrackedMeasure[];
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
    /** Get the user tracked measure metadata for a user's measure by id */
    getUserMeasureMetadataById: (id: string) => UserTrackedMeasure | undefined;
    /** Gets the user defined color of a measure by its id */
    getUserMeasureColorById: (id: string) => string | undefined;
    /** Update whether a measure is filtered or not by id */
    setUserTrackedMeasureFilterStatusById: (id: string, isDisplayed: boolean) => void;
    /**  Toggle all measures as filtered on or off except for this id */
    toggleAllUserTrackedFilterStatusesBasedOnAnId: (id: string) => void;
}

export const useUserStore = create<UserState>((set, get) => ({
  userTrackedMeasures: undefined,
  getSafeUserTrackedMeasures: () => get().userTrackedMeasures ? get().userTrackedMeasures! : [],
  setUserTrackedMeasures: (userTrackedMeasures: UserTrackedMeasure[]) => set({userTrackedMeasures}),
  addUserTrackedMeasure: (newUserTrackedMeasure: UserTrackedMeasure) => set({userTrackedMeasures: [...get().getSafeUserTrackedMeasures(), newUserTrackedMeasure]}),
  getUserTrackedMeasureUniqueIds: () => get().getSafeUserTrackedMeasures().map((measure) => getMeasureUniqueId(measure)),
  removeTrackedMeasureById: (id) => set({userTrackedMeasures: get().getSafeUserTrackedMeasures().filter((measure) => getMeasureUniqueId(measure) != id)}),
  getUserTrackedMeasurePositionById: (id) => get().getSafeUserTrackedMeasures().find((utm: UserTrackedMeasure) => getMeasureUniqueId(utm) === id)?.position,
  getUserMeasureMetadataById: (id) => get().getSafeUserTrackedMeasures().find((measure: UserTrackedMeasure) => getMeasureUniqueId(measure) === id),
  getUserMeasureColorById: (id) => get().getUserMeasureMetadataById(id)?.color,
  setUserTrackedMeasureFilterStatusById: (id, isDisplayed) => set({userTrackedMeasures: getUserTrackedMeasuresWithNewFilterStatus(get().getSafeUserTrackedMeasures(), id, isDisplayed)}),
  toggleAllUserTrackedFilterStatusesBasedOnAnId: (id) => set({userTrackedMeasures: getToggledFilters(get().getSafeUserTrackedMeasures(), id)}),
}));

const getToggledFilters = (userTrackedMeasures: UserTrackedMeasure[], id: string) => {
    let newTrackedMeasures: UserTrackedMeasure[] = [];
    const displayedMeasures = userTrackedMeasures.filter((measure) => measure.isDisplayed);
    if(displayedMeasures.length === 1 && getMeasureUniqueId(displayedMeasures[0]) === id) {
        // turn all on
        userTrackedMeasures.forEach((measure) => {
            newTrackedMeasures.push({...measure, isDisplayed: true});
        })
    } else {
        // turn all off except for the id
        userTrackedMeasures.forEach((measure) => {
            if(getMeasureUniqueId(measure) === id) {
            newTrackedMeasures.push({...measure, isDisplayed: true})
            } else {
            newTrackedMeasures.push({...measure, isDisplayed: false});
            }
        })
    }
    
    return newTrackedMeasures
}

const getUserTrackedMeasuresWithNewFilterStatus = (userTrackedMeasures: UserTrackedMeasure[], id: string, isDisplayed: boolean) => {
    let newTrackedMeasures: UserTrackedMeasure[] = [];
    userTrackedMeasures.forEach((measure) => {
      if(getMeasureUniqueId(measure) === id) {
        newTrackedMeasures.push({...measure, isDisplayed})
      } else {
        newTrackedMeasures.push(measure);
      }
    })
    return newTrackedMeasures
  }