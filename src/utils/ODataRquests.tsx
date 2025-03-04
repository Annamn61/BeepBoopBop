import axios from 'axios';
import {
  getUniqueMeasureIdentifier,
  isCacheOutOfDateById,
  useLocalStorage,
} from '../data/cache/cache';
import useMeasureStore from '../store/MeasureStore';
import { Measure, UserTrackedMeasure } from '../types/MeasureTypes';
import { AgendaItem } from '../types/CommitteeAgendaTypes';
import { useEffect } from 'react';
import { getMeasureIdentifierFilters } from './measure';
import { useSnackbarStore } from '../store/SnackbarStore';
import { useUser } from './user';
import { userTrackedMeasures as defaultUserTrackedMeasures } from '../data/userMeasureData';
import { getRemoteUserTrackedMeasures } from '../data/firebaseFirestore';

const baseURL = 'https://api.oregonlegislature.gov/odata/odataservice.svc/';

export const fetchMeasure = async (
  sessionKey: string,
  id: string,
  onNoBill: () => void
) => {
  const filters = getMeasureIdentifierFilters(id, sessionKey);

  try {
    const response = await axios.get(
      `${baseURL}/Measures?$filter=${filters}&$expand=CommitteeMeetingDocuments,MeasureDocuments,MeasureHistoryActions,MeasureSponsors`
    );
    if (!response?.data?.value?.length) {
      onNoBill();
    }
    return response.data;
  } catch (error: any) {
    console.log('Error fetching measures:', error.status, error.status === 400);
    if (error.status === 400) {
      onNoBill();
    } else {
      throw error;
    }
  }
};

export const fetchAgendaItems = async (sessionKey: string, id: string) => {
  const filters = getMeasureIdentifierFilters(id, sessionKey);

  try {
    const response = await axios.get(
      `${baseURL}/CommitteeAgendaItems?$filter=${filters}&$expand=CommitteeMeeting`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching agenda items:', error);
    throw error;
  }
};

export const useGetUserTrackedMeasures = () => {
  const { currentUser } = useUser();
  const { setUserTrackedMeasuresInCache } = useLocalStorage();

  useEffect(() => {
    if (!currentUser) {
      console.log('no current user');
      setUserTrackedMeasuresInCache(defaultUserTrackedMeasures);
    } else {
      getRemoteUserTrackedMeasures(currentUser);
      // get the users actual data from the remote
      // set this
    }
  }, [currentUser]);
};

/**
 * Fetches a measure, its history, and related agenda items
 * This comes from localstorage if it is not stale
 * This resets localstorage if it is stale
 */
export const useFetchMeasureInfoFromApi = async () => {
  const {
    userTrackedMeasures,
    removeTrackedMeasureById,
    getUserTrackedMeasureUniqueIds,
  } = useMeasureStore();
  const { updateMeasureItemInCache, syncTrackedItemsWithCache } =
    useLocalStorage();
  const { showSnackbar } = useSnackbarStore();

  useEffect(() => {
    console.log('userTrackedMeasures', userTrackedMeasures.length);
  }, [userTrackedMeasures]);

  useEffect(() => {
    userTrackedMeasures.forEach(
      async ({ id, sessionKey }: UserTrackedMeasure) => {
        const uniqueMeasureId = getUniqueMeasureIdentifier(id, sessionKey);

        if (isCacheOutOfDateById(id, sessionKey)) {
          const measure = (await fetchMeasure(sessionKey, id, () => {
            removeTrackedMeasureById(id);
            showSnackbar(
              `Error finding ${id} in session ${sessionKey}`,
              'error'
            );
          })) as Measure;
          const agendaItems = (await fetchAgendaItems(
            sessionKey,
            id
          )) as AgendaItem;
          updateMeasureItemInCache(measure, agendaItems, uniqueMeasureId);
        }
      }
    );
    syncTrackedItemsWithCache(getUserTrackedMeasureUniqueIds());
    // TODO: also ensure that all the localstorage objects are in sync with what user tracked measures there are
  }, [userTrackedMeasures]);
};

// https://olis.oregonlegislature.gov/liz/2025R1/Testimony/SEE/SB/88/0000-00-00-00-00?area=Measures

// export const fetchTestimony = async () => {
//   try {
//     const response = await axios.get(
//       `https://olis.oregonlegislature.gov/liz/2025R1/Testimony/SEE/SB/88/0000-00-00-00-00?area=Measures`
//     );
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching testimony', error);
//     throw error;
//   }
// };
