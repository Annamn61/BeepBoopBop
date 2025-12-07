import { useEffect } from "react";
import { useUser } from "../../../utils/user";
// import { defaultUTMData } from "../../userMeasureData";
import { UserTrackedMeasure } from "../../../types/MeasureTypes";
import { getRemoteUserTrackedMeasures } from "../../firebaseFirestore";
import { useUserStore } from "../../../store/UserStore";

export const userUserController = () => {
    const { currentUser } = useUser();
    const { setUserTrackedMeasures, setAreUserMeasuresLoading } = useUserStore();

    useEffect(() => {
        console.log('currentUser', currentUser);
        if(!currentUser) {
            // setUserTrackedMeasures(defaultUTMData);
            // setAreUserMeasuresLoading(false);
        } else {
            setAreUserMeasuresLoading(true);
            getRemoteUserTrackedMeasures(currentUser).then((measures) => {
                const measuresConverted = measures as unknown as UserTrackedMeasure[];
                setUserTrackedMeasures(measuresConverted);
                setAreUserMeasuresLoading(false);
            }).catch(error => {
                console.error("Error fetching user measures:", error);
                setAreUserMeasuresLoading(false);
            });
            // TODO: Fetch user measures from firebase
            // Store these in localstorage 
        }
    }, [currentUser])
}