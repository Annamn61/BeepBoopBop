import { useEffect, useMemo } from "react";
import useCommitteeStore from "../../../store/CommitteeStore";
import { LocalStorageCommitteeCache } from "../../../types/cache";

export const useCommitteeStoreController = (committeeCacheObject: LocalStorageCommitteeCache | null, areCommitteeCacheObjectsLoading: boolean) => {
    console.log(areCommitteeCacheObjectsLoading);
    const { setUnfilteredCommittees } = useCommitteeStore();
    
    const committeeDataList = useMemo(() => {
        return committeeCacheObject ? committeeCacheObject.value : [];  
    }, [committeeCacheObject]);

    useEffect(() => {
        setUnfilteredCommittees(committeeDataList);
    }, [committeeDataList]);
}