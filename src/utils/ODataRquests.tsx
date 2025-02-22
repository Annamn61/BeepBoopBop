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

const baseURL = 'https://api.oregonlegislature.gov/odata/odataservice.svc/';

export const fetchMeasure = async (
  sessionKey: string,
  id: string,
  onNoBill: () => void
) => {
  const filters = getMeasureIdentifierFilters(id, sessionKey);

  try {
    const response = await axios.get(
      `${baseURL}/Measures?$filter=${filters}&$expand=MeasureDocuments,MeasureHistoryActions`
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
      `${baseURL}/CommitteeAgendaItems?$filter=${filters}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching agenda items:', error);
    throw error;
  }
};

/**
 * Fetches a measure, its history, and related agenda items
 * This comes from localstorage if it is not stale
 * This resets localstorage if it is stale
 */
export const useFetchMeasureInfoFromApi = async () => {
  const { userTrackedMeasures, removeTrackedMeasureById } = useMeasureStore();
  const { updateMeasureItemInCache } = useLocalStorage();
  const { showSnackbar } = useSnackbarStore();

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
  }, [userTrackedMeasures]);
};
