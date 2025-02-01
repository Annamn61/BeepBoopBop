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

export const fetchMeasures = async () => {
  try {
    const requests = measureData.map(({ measurePrefix, measureNumber }) => {
      const url = `${baseURL}/Measures?$filter=MeasureNumber eq ${measureNumber} and MeasurePrefix eq '${measurePrefix}' and SessionKey eq '${sessionKey}'`;
      return axios.get(url);
    });

    const responses = await Promise.all(requests);
    
    // Extract data from responses
    const data = responses.map(response => response.data);

    console.log("Fetched Measures:", data);
    return data;
  } catch (error) {
    console.error("Error fetching measures:", error);
    throw error;
  }
};