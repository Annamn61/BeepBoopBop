import axios from "axios";
import { getMeasureFilters, getSessionKeyFilter } from "../../utils/measure";

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

  export const fetchCommittees = async () => {

    const filters = getSessionKeyFilter();
    try {
        const response = await axios.get(`${baseURL}/Committees?$filter=${filters}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching committees:', error);
        throw error;
    }
  };

  export const fetchLegislators = async () => {

    const filters = getSessionKeyFilter();
    try {
        const response = await axios.get(`${baseURL}/Legislators?$filter=${filters}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching Legislators:', error);
        throw error;
    }
  };