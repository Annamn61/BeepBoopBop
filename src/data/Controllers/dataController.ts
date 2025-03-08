import { userOLISMeasureController } from "./apiControllers/olisMeasuresController";
import { userUserController } from "./apiControllers/userController";
import { useMeasureStoreController } from "./storeControllers/MeasureStoreController";
import { useUserStoreController } from "./storeControllers/UserStoreController";

export const useDataController = () => {
    const {userTrackedMeasures, areUtmsLoading} = userUserController();
    const { measuresCacheObject, areMeasureCacheObjectsLoading } = userOLISMeasureController(userTrackedMeasures);
    
    useMeasureStoreController(measuresCacheObject, areMeasureCacheObjectsLoading);
    useUserStoreController(userTrackedMeasures, areUtmsLoading);
}