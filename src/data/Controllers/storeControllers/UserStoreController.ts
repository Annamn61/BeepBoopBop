import { useEffect } from "react";
import { useUserStore } from "../../../store/UserStore";
import { UserTrackedMeasure } from "../../../types/MeasureTypes";

export const useUserStoreController = (userTrackedMeasures: UserTrackedMeasure[], areUtmsLoading: boolean) => {
    const { setUserTrackedMeasures } = useUserStore();

    useEffect(() => {
        setUserTrackedMeasures(userTrackedMeasures);
    }, [userTrackedMeasures])
}