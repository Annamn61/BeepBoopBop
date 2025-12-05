import { useEffect, useMemo } from "react";
import useLegislatorStore from "../../../store/LegislatorStore";
import { LocalStorageLegislatorCache } from "../../../types/cache";

export const useLegislatorStoreController = (legislatorCacheObject: LocalStorageLegislatorCache | null, areLegislatorCacheObjectsLoading: boolean) => {
    const { setUnfilteredLegislators } = useLegislatorStore();
    
    const legislatorDataList = useMemo(() => {
        return legislatorCacheObject ? legislatorCacheObject.value : [];  
    }, [legislatorCacheObject]);

    useEffect(() => {
        setUnfilteredLegislators(legislatorDataList);
    }, [legislatorDataList]);
}