import axios from "axios";
import { getCommitteeFilters, getMeasureFilters } from "../../utils/measure";
import { LocalStorageCommitteeCache } from "../../types/cache";

const baseURL = 'https://api.oregonlegislature.gov/odata/odataservice.svc/';

export const fetchMeasure = async (
    uniqueId: string,
  ) => {
    
    const filters = getMeasureFilters(uniqueId);
  
    try {
      const response = await axios.get(
        `${baseURL}/Measures?$filter=${filters}&$expand=CommitteeMeetingDocuments,MeasureDocuments,MeasureHistoryActions,MeasureSponsors`
      );
      if (!response?.data?.value?.length) {
        console.log('no bill');
        // onNoBill();
      }
      return response.data;
    } catch (error: any) {
      console.log('Error fetching measures:', error.status, error.status === 400);
      if (error.status === 400) {
        console.log('no bill');
        // onNoBill();
      } else {
        throw error;
      }
    }
  };

  export const fetchAgendaItems = async (
    uniqueId: string,
  ) => {
    
    const filters = getMeasureFilters(uniqueId);

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

  export const fetchCommittees = async (): Promise<LocalStorageCommitteeCache> => {

    const filters = getCommitteeFilters();
    console.log("fetching committees");
    try {
        console.log("fetching committees response");
        const response = await axios.get(`${baseURL}/Committees?$filter=${filters}`);
        console.log("fetching committees response 2");
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching committees:', error);
        throw error;
    }
  };