import { userOLISMeasureController } from "./apiControllers/olisMeasuresController";
import { userUserController } from "./apiControllers/userController";
import { useCommitteeStoreController } from "./storeControllers/CommitteeStoreController";
import { useLegislatorStoreController } from "./storeControllers/LegislatorStoreController";
import { useMeasureStoreController } from "./storeControllers/MeasureStoreController";

export const useDataController = () => {
    userUserController();
    const { measuresCacheObject, isMeasureCacheObjectLoading, committeesCacheObject, isCommitteesCacheObjectLoading, legislatorsCacheObject, isLegislatorsCacheObjectLoading } = userOLISMeasureController();
    
    useMeasureStoreController(measuresCacheObject, isMeasureCacheObjectLoading);
    useCommitteeStoreController(committeesCacheObject, isCommitteesCacheObjectLoading);
    useLegislatorStoreController(legislatorsCacheObject, isLegislatorsCacheObjectLoading);
}