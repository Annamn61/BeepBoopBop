import { userOLISMeasureController } from "./apiControllers/olisMeasuresController";
import { userUserController } from "./apiControllers/userController";
import { useMeasureStoreController } from "./storeControllers/MeasureStoreController";
import { useUserStoreController } from "./storeControllers/UserStoreController";

export const useDataController = () => {
    const {userTrackedMeasures, areUtmsLoading} = userUserController();
    const { measuresCacheObject, isMeasureCacheObjectLoading } = userOLISMeasureController(userTrackedMeasures);
    
    useMeasureStoreController(measuresCacheObject, isMeasureCacheObjectLoading);
    useUserStoreController(userTrackedMeasures, areUtmsLoading);
}