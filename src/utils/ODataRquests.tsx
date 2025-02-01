import axios from "axios";
import { measureData } from "../data/measureData";

const baseURL = "https://api.oregonlegislature.gov/odata/odataservice.svc/";
const sessionKey = "2025R1";

export const getMeasure = async (sessionKey: string, measurePrefix: string, measureNumber: number) => {
  try {
    const response = await axios.get(`${baseURL}/Measures?$filter=SessionKey eq '${sessionKey}' and MeasurePrefix eq '${measurePrefix}' and MeasureNumber eq ${measureNumber}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching measures:", error);
    throw error;
  }
};

interface MeasureObject {
  value: [Measure]
}

interface Measure {
  MeasureNumber: number,
}

interface MeasureStore {
  lastUpdated: string,
  measures: Measure[], 
}

export const getMeasuresFromStore = () => {
  const result = localStorage.getItem('Measures')
  if(result) {
    return  JSON.parse(result) as MeasureStore;
  }
  return undefined;
}

export const isMeasureCacheOutdated = (measures: MeasureStore) => {
  const now = new Date();
  const lastUpdated = new Date(measures.lastUpdated)
  const oneDayInMilliseconds = 24 * 60 * 60 * 1000;    
  const dateToUpdateData = new Date(lastUpdated.getTime() + oneDayInMilliseconds)
  return now > dateToUpdateData;
}

export const fetchMeasures = async () => {
  const measures = getMeasuresFromStore();
  if(measures && !isMeasureCacheOutdated(measures)) {
    return measures?.measures || [];
    
  }
  try {
    
    const requests = measureData.map(({ measurePrefix, measureNumber }) => {
      const url = `${baseURL}/Measures?$filter=MeasureNumber eq ${measureNumber} and MeasurePrefix eq '${measurePrefix}' and SessionKey eq '${sessionKey}'`;
      return axios.get(url);
    });

    const responses = await Promise.all(requests);
    
    // Extract data from responses
    const data = responses.map(response => response.data);

    // console.log("Fetched Measures:", data);
    const measureObject = {
      lastUpdated: Date.now().toString(),
    measures: data,
    }
    localStorage.setItem('Measures', JSON.stringify(measureObject))
    return data;
  } catch (error) {
    console.error("Error fetching measures:", error);
    throw error;
  }
  

};

export const fetchCommitteeMeetings = async () => {
  try {

    const url = `${baseURL}/CommitteeMeetings?$filter=SessionKey eq '${sessionKey}'`;
    axios.get(url).then((response) => {
      console.log('CM', response);
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
      console.log('AI', response);
    });
    
  } catch (error) {
    console.error("Error fetching committee agenda items:", error);
    throw error;
  }

};

export const fetchMeasureDocuments = async () => {
  try {

    const url = `${baseURL}/MeasureDocuments?$filter=SessionKey eq '${sessionKey}'`;
    axios.get(url).then((response) => {
      console.log('MD', response);
    });
    
  } catch (error) {
    console.error("Error fetching measure documents:", error);
    throw error;
  }

};