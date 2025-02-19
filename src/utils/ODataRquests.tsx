import axios from "axios";
import { getUniqueMeasureIdentifier, isCacheOutOfDateById, useLocalStorage } from "../data/cache/cache";
import useMeasureStore from "../store/MeasureStore";
import { Measure, UserTrackedMeasure } from "../types/MeasureTypes";
import { AgendaItem } from "../types/CommitteeAgendaTypes";
import { useEffect } from "react";
import { getMeasureIdentifierFilters } from "./measure";

const baseURL = "https://api.oregonlegislature.gov/odata/odataservice.svc/";

export const fetchMeasure = async (sessionKey: string, id: string) => {
  const filters = getMeasureIdentifierFilters(id, sessionKey);

  try {
    const response = await axios.get(`${baseURL}/Measures?$filter=${filters}&$expand=MeasureDocuments,MeasureHistoryActions`);
    return response.data;
  } catch (error) {
    console.error("Error fetching measures:", error);
    throw error;
  }
};

export const fetchAgendaItems = async (sessionKey: string, id: string) => {

  const filters = getMeasureIdentifierFilters(id, sessionKey);

  try {
    const response = await axios.get(`${baseURL}/CommitteeAgendaItems?$filter=${filters}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching agenda items:", error);
    throw error;
  }
}

/**
 * Fetches a measure, its history, and related agenda items
 * This comes from localstorage if it is not stale 
 * This resets localstorage if it is stale
 */
export const useFetchMeasureInfoFromApi = async () => {
  const { userTrackedMeasures } = useMeasureStore();
  const { updateMeasureItemInCache} = useLocalStorage()

  useEffect(() => {

    userTrackedMeasures.forEach(async ({id, sessionKey}: UserTrackedMeasure) => {
      const uniqueMeasureId = getUniqueMeasureIdentifier(id, sessionKey);
  
      if(isCacheOutOfDateById(id, sessionKey)) {
        const measure = await fetchMeasure(sessionKey, id) as Measure;
        const agendaItems = await fetchAgendaItems(sessionKey, id) as AgendaItem;
        updateMeasureItemInCache(measure, agendaItems, uniqueMeasureId);
      }
  
    });

  }, [])

}
