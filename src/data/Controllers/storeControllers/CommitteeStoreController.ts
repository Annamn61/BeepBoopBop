import { useEffect, useMemo } from "react";
import useCommitteeStore from "../../../store/CommitteeStore";
import { LocalStorageCommitteeCache } from "../../../types/cache";

export const useCommitteeStoreController = (committeeCacheObject: LocalStorageCommitteeCache | null) => {
    const { setUnfilteredCommittees } = useCommitteeStore();
    
    const committeeDataList = useMemo(() => {
        return committeeCacheObject ? committeeCacheObject.value : [];  
    }, [committeeCacheObject]);

    useEffect(() => {
        setUnfilteredCommittees(committeeDataList);
    }, [committeeDataList]);
}