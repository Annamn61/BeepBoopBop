import { create } from "zustand";
import { UserTrackedMeasure, UserTrackedMeasureWithSource } from "../types/MeasureTypes";
import { getMeasureUniqueId } from "../utils/measure";

export interface GroupSummary {
    id: string;
    name: string;
}

export interface GroupMeasures {
    [groupId: string]: UserTrackedMeasure[]; 
}

interface UserState {
    /** Metadata about the measures a user is tracking */
    userTrackedMeasures: UserTrackedMeasure[] | undefined;
    getSafeUserTrackedMeasures: () => UserTrackedMeasure[];
    /** set the metadata about the measures a user is tracking */
    setUserTrackedMeasures: (userTrackedMeasures: UserTrackedMeasure[] | undefined) => void;
    /** Whether user measures are currently loading from Firebase */
    areUserMeasuresLoading: boolean;
    setAreUserMeasuresLoading: (areUserMeasuresLoading: boolean) => void;
    /** Add a single measure's metadata for tracking  */
    addUserTrackedMeasure: (newUserTrackedMeasure: UserTrackedMeasure) => void;
    /** Update a measure's metadata */
    updateUserTrackedMeasure: (oldId: string, updatedMeasure: UserTrackedMeasure) => void;
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
    /** Gets the user defined nickname of a measure by its id */
    getUserMeasureNicknameById: (id: string | undefined) => string | undefined;
    /** Update whether a measure is filtered or not by id */
    setUserTrackedMeasureFilterStatusById: (id: string, isDisplayed: boolean) => void;
    /**  Toggle all measures as filtered on or off except for this id */
    toggleAllUserTrackedFilterStatusesBasedOnAnId: (id: string) => void;
    /** Groups the user is in */
    userGroups: GroupSummary[];
    /** Set the user's groups */
    setUserGroups: (userGroups: GroupSummary[]) => void;
    /** Add a group to the user's groups (optimistic update) */
    addUserGroup: (group: GroupSummary) => void;
    /** Remove a group from the user's groups */
    removeUserGroup: (groupId: string) => void;
    /** Group measures stored in user document: groupId -> measureIds */
    groupMeasures: GroupMeasures;
    /** Set group measures */
    setGroupMeasures: (groupMeasures: GroupMeasures) => void;
    /** Get all measures (user + group) with source tracking, handling duplicates */
    getAllTrackedMeasuresWithSource: () => UserTrackedMeasureWithSource[];
    /** Get all measure IDs for OLIS fetching (user + group, deduplicated) */
    getAllMeasureIdsForFetching: () => string[];
}

export const useUserStore = create<UserState>((set, get) => ({
  userTrackedMeasures: undefined,
  areUserMeasuresLoading: true,
  getSafeUserTrackedMeasures: () => get().userTrackedMeasures ? get().userTrackedMeasures! : [],
  setUserTrackedMeasures: (userTrackedMeasures) => set({userTrackedMeasures}),
  setAreUserMeasuresLoading: (areUserMeasuresLoading) => set({areUserMeasuresLoading}),
  addUserTrackedMeasure: (newUserTrackedMeasure) => set({userTrackedMeasures: [...get().getSafeUserTrackedMeasures(), newUserTrackedMeasure]}),
  updateUserTrackedMeasure: (oldId, updatedMeasure) => {
    const measures = get().getSafeUserTrackedMeasures();
    const oldIndex = measures.findIndex((m) => getMeasureUniqueId(m) === oldId);
    if (oldIndex >= 0) {
      const newMeasures = [...measures];
      const newId = getMeasureUniqueId(updatedMeasure);
      // If ID changed, remove old and add new
      if (oldId !== newId) {
        newMeasures.splice(oldIndex, 1);
        newMeasures.push(updatedMeasure);
      } else {
        // Just update in place
        newMeasures[oldIndex] = updatedMeasure;
      }
      set({userTrackedMeasures: newMeasures});
    }
  },
  getUserTrackedMeasureUniqueIds: () => get().getSafeUserTrackedMeasures().map((measure) => getMeasureUniqueId(measure)),
  removeTrackedMeasureById: (id) => set({userTrackedMeasures: get().getSafeUserTrackedMeasures().filter((measure) => getMeasureUniqueId(measure) != id)}),
  getUserTrackedMeasurePositionById: (id) => {
    const allMeasures = get().getAllTrackedMeasuresWithSource();
    const trackedMeasure = allMeasures.find(m => getMeasureUniqueId(m) === id);
    return trackedMeasure?.position;
  },
  getUserMeasureMetadataById: (id) => get().getSafeUserTrackedMeasures().find((measure: UserTrackedMeasure) => getMeasureUniqueId(measure) === id),
  getUserMeasureColorById: (id) => {
    // Check all tracked measures (user + group) for color
    const allMeasures = get().getAllTrackedMeasuresWithSource();
    const trackedMeasure = allMeasures.find(m => getMeasureUniqueId(m) === id);
    return trackedMeasure?.color;
  },
  getUserMeasureNicknameById: (id) => {
    if (!id) return undefined;
    const allMeasures = get().getAllTrackedMeasuresWithSource();
    const trackedMeasure = allMeasures.find(m => getMeasureUniqueId(m) === id);
    return trackedMeasure?.nickname;
  },
  setUserTrackedMeasureFilterStatusById: (id, isDisplayed) => set({userTrackedMeasures: getUserTrackedMeasuresWithNewFilterStatus(get().getSafeUserTrackedMeasures(), id, isDisplayed)}),
  toggleAllUserTrackedFilterStatusesBasedOnAnId: (id) => set({userTrackedMeasures: getToggledFilters(get().getSafeUserTrackedMeasures(), id)}),
  userGroups: [],
  setUserGroups: (userGroups) => set({userGroups}),
  addUserGroup: (group) => set({userGroups: [...get().userGroups, group]}),
  removeUserGroup: (groupId) => set({userGroups: get().userGroups.filter((g) => g.id !== groupId)}),
  groupMeasures: {},
  setGroupMeasures: (groupMeasures) => set({groupMeasures}),
  getAllTrackedMeasuresWithSource: () => {
    const userMeasures = get().getSafeUserTrackedMeasures();
    const groupMeasures = get().groupMeasures;
    const userGroups = get().userGroups;
    const userMeasureIds = new Set(userMeasures.map(m => getMeasureUniqueId(m)));
    
    // Start with user measures (marked as source: 'user')
    const allMeasures: UserTrackedMeasureWithSource[] = userMeasures.map(measure => ({
      ...measure,
      source: 'user' as const,
      isDuplicate: false,
    }));
    
    // Add group measures, checking for duplicates
    Object.entries(groupMeasures).forEach(([groupId, measures]) => {
      const group = userGroups.find(g => g.id === groupId);
      if (!group) return;
      
      measures.forEach((measure) => {
        const measureId = getMeasureUniqueId(measure);
        // Check if this measure exists in user measures
        const existsInUser = userMeasureIds.has(measureId);
        
        // Use the full measure object from the group with its own metadata
        allMeasures.push({
          ...measure,
          source: { type: 'group', groupId, groupName: group.name },
          isDuplicate: existsInUser, // Mark as duplicate if it exists in user measures
        });
      });
    });
    
    return allMeasures;
  },
  getAllMeasureIdsForFetching: () => {
    const userMeasures = get().getSafeUserTrackedMeasures();
    const groupMeasures = get().groupMeasures;
    const userMeasureIds = new Set(userMeasures.map(m => getMeasureUniqueId(m)));
    const allIds = new Set<string>();
    
    // Add user measure IDs
    userMeasureIds.forEach(id => allIds.add(id));
    
    // Add group measure IDs (deduplicated)
    Object.values(groupMeasures).forEach(measures => {
      measures.forEach(measure => {
        const id = getMeasureUniqueId(measure);
        if (!userMeasureIds.has(id)) {
          allIds.add(id);
        }
      });
    });
    
    return Array.from(allIds);
  },
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