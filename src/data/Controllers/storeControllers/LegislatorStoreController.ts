import { useEffect, useMemo } from "react";
import useLegislatorStore from "../../../store/LegislatorStore";
import { LocalStorageLegislatorCache } from "../../../types/cache";

export const useLegislatorStoreController = (legislatorCacheObject: LocalStorageLegislatorCache | null) => {
    const { setUnfilteredLegislators } = useLegislatorStore();
    
    const legislatorDataList = useMemo(() => {
        return legislatorCacheObject ? legislatorCacheObject.value : [];  
    }, [legislatorCacheObject]);

    useEffect(() => {
        setUnfilteredLegislators(legislatorDataList);
    }, [legislatorDataList]);
}