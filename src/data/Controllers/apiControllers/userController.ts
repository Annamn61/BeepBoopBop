import { useEffect, useState } from "react";
import { useUser } from "../../../utils/user";
import { defaultUTMData } from "../../userMeasureData";
import { UserTrackedMeasure } from "../../../types/MeasureTypes";

export const userUserController = () => {
    const { currentUser } = useUser();
    const [userTrackedMeasures, setUserTrackedMeasures] = useState<UserTrackedMeasure[] | undefined>(undefined);
    const [areUtmsLoading, setAreUtmsLoading] = useState(true);

    useEffect(() => {
        if(!currentUser) {
            setUserTrackedMeasures(defaultUTMData)
            setAreUtmsLoading(false);
        } else {
            setAreUtmsLoading(true);
            // TODO: Fetch user measures from firebase
            // Store these in localstorage 
            setAreUtmsLoading(false);
        }
    }, [currentUser])

    return {
        userTrackedMeasures,
        areUtmsLoading,
    }
}