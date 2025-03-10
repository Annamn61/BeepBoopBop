import { userOLISMeasureController } from "./apiControllers/olisMeasuresController";
import { userUserController } from "./apiControllers/userController";
import { useMeasureStoreController } from "./storeControllers/MeasureStoreController";
import { useUserStoreController } from "./storeControllers/UserStoreController";
import { useCommitteeStoreController } from "./storeControllers/CommitteeStoreController";

export const useDataController = () => {
    const { userTrackedMeasures, areUtmsLoading } = userUserController();
    const { measuresCacheObject, isMeasureCacheObjectLoading, committeesCacheObject, isCommitteesCacheObjectLoading } = userOLISMeasureController(userTrackedMeasures);
    
    useMeasureStoreController(measuresCacheObject, isMeasureCacheObjectLoading);
    useUserStoreController(userTrackedMeasures, areUtmsLoading);
    useCommitteeStoreController(committeesCacheObject, isCommitteesCacheObjectLoading);
}