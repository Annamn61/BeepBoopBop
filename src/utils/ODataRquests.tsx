import axios from "axios";
import { userTrackedMeasures } from "../data/userMeasureData";
import { MeasureLocalStorage } from "../types/MeasureTypes";

const baseURL = "https://api.oregonlegislature.gov/odata/odataservice.svc/";

export const getMeasure = async (sessionKey: string, measurePrefix: string, measureNumber: number) => {
  try {
    const response = await axios.get(`${baseURL}/Measures?$filter=SessionKey eq '${sessionKey}' and MeasurePrefix eq '${measurePrefix}' and MeasureNumber eq ${measureNumber}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching measures:", error);
    throw error;
  }
};

export const getMeasuresFromStore = () => {
  const result = localStorage.getItem('Measures')
  if(result) {
    return  JSON.parse(result) as MeasureLocalStorage;
  }
  return undefined;
}

export const isMeasureCacheOutdated = (measures: MeasureLocalStorage) => {
  const now = new Date();
  const lastUpdated = new Date(measures.lastUpdated)
  const oneDayInMilliseconds = 24 * 60 * 60 * 1000;    
  const dateToUpdateData = new Date(lastUpdated.getTime() + oneDayInMilliseconds)
  return now > dateToUpdateData;
}

export const fetchMeasures = async () => {
  const measures = getMeasuresFromStore();
  if(measures && !isMeasureCacheOutdated(measures)) {
    const measureState =  measures?.measures || [];
    return measureState;
  }
  try {
    const requests = userTrackedMeasures.map(({ id, sessionKey }) => {
      const splitId = id.split(' ');
      const measurePrefix = splitId[0];
      const measureNumber = splitId[1];
      const url = `${baseURL}/Measures?$filter=MeasureNumber eq ${measureNumber} and MeasurePrefix eq '${measurePrefix}' and SessionKey eq '${sessionKey}'&$expand=MeasureDocuments`;
      return axios.get(url);
    });

    const responses = await Promise.all(requests);

    // Extract data from responses
    const data = responses.map(response => response.data);

    const measureObject = {
      lastUpdated: Date.now().toString(),
      measures: data,
    }
    localStorage.setItem('Measures', JSON.stringify(measureObject));
    // localStorage.setItem('MeasureDocuments', JSON.stringify(measureObject.measures.))
    return data;
  } catch (error) {
    console.error("Error fetching measures:", error);
    throw error;
  }
  

};

export const fetchCommitteeMeetings = async () => {
  const sessionKey = '2025R1';
  try {

    const url = `${baseURL}/CommitteeMeetings?$filter=SessionKey eq '${sessionKey}'`;
    axios.get(url).then((response) => {
      // console.log('CM', response);
    });
    
  } catch (error) {
    console.error("Error fetching committee meetings:", error);
    throw error;
  }
};


export const fetchCommitteeAgendaItems = async () => {
  const measureNumber = '2978'
  const measurePrefix = 'HB'
  // const sessionKey = '2023R1'

  try {

    const url = `${baseURL}/CommitteeAgendaItems?$filter=MeasureNumber eq ${measureNumber} and MeasurePrefix eq '${measurePrefix}'`;
    axios.get(url).then((response) => {
      // console.log('AI', response);
    });
    
  } catch (error) {
    console.error("Error fetching committee agenda items:", error);
    throw error;
  }

};

export const fetchMeasureDocuments = async () => {
  const sessionKey = '2025R1';

  try {
    const url = `${baseURL}/MeasureDocuments?$filter=SessionKey eq '${sessionKey}'`;
    axios.get(url).then((response) => {
      // console.log('MD', response);
    });
    
  } catch (error) {
    console.error("Error fetching measure documents:", error);
    throw error;
  }

};