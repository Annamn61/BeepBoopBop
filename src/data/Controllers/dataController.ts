import { userOLISMeasureController } from "./apiControllers/olisMeasuresController";
import { userUserController } from "./apiControllers/userController";
import { useCommitteeStoreController } from "./storeControllers/CommitteeStoreController";
import { useLegislatorStoreController } from "./storeControllers/LegislatorStoreController";
import { useMeasureStoreController } from "./storeControllers/MeasureStoreController";

const useDataController = () => {
    userUserController();
    const { measuresCacheObject, committeesCacheObject, legislatorsCacheObject } = userOLISMeasureController();
    
    useMeasureStoreController(measuresCacheObject);
    useCommitteeStoreController(committeesCacheObject);
    useLegislatorStoreController(legislatorsCacheObject);
}

export const DataControllerWrapper = () => {
    useDataController();
    return null; // Doesn't render anything
  }