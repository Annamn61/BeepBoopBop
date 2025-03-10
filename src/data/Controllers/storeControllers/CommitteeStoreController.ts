import { useEffect, useMemo } from "react";
import useCommitteeStore from "../../../store/CommitteeStore";
import { LocalStorageCommitteeCache } from "../../../types/cache";

export const useCommitteeStoreController = (committeeCacheObject: LocalStorageCommitteeCache, areCommitteeCacheObjectsLoading: boolean) => {
    console.log(areCommitteeCacheObjectsLoading);
    const { setUnfilteredCommittees } = useCommitteeStore();
    
    const committeeDataList = useMemo(() => Object.entries(committeeCacheObject).map(([_, committeeCacheObject]) => {
        return committeeCacheObject.CommitteeData;
    }), [committeeCacheObject]);

    useEffect(() => {
        setUnfilteredCommittees(committeeDataList);
    }, [committeeDataList]);
}