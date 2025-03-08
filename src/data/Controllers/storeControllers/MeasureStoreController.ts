import { useEffect, useMemo } from "react";
import useMeasureStore from "../../../store/MeasureStore";
import { LocalStoreageMeasureCache } from "../../../types/cache";
import useHistoryStore from "../../../store/HistoryStore";
import useCommitteeAgendaStore from "../../../store/CommitteeAgendaStore";


export const useMeasureStoreController = (measuresCacheObject: LocalStoreageMeasureCache, areMeasureCacheObjectsLoading: boolean) => {
    const { setUnfilteredMeasures } = useMeasureStore();
    const { setUnfilteredHistory } = useHistoryStore();
    const { setUnfilteredCommitteeAgenda } = useCommitteeAgendaStore();
    
    const measureDataList = useMemo(() => Object.entries(measuresCacheObject).map(([_, measuresCacheObject]) => {
        return measuresCacheObject.MeasureData
    }), [measuresCacheObject])

    const historyDataList = useMemo(() => Object.entries(measuresCacheObject).flatMap(([_, measuresCacheObject]) => {
        return measuresCacheObject.MeasureData?.value[0].MeasureHistoryActions || [];
    }), [measuresCacheObject])

    const agendaDataList = useMemo(() => Object.entries(measuresCacheObject).flatMap(([_, measuresCacheObject]) => {
        return measuresCacheObject.CommitteeAgendaItems?.value|| [];
    }), [measuresCacheObject])

    useEffect(() => {
        setUnfilteredMeasures(measureDataList);
    }, [measureDataList])

    useEffect(() => {
        setUnfilteredHistory(historyDataList);
    }, [historyDataList])

    useEffect(() => {
        setUnfilteredCommitteeAgenda(agendaDataList);
        console.log('ADL', agendaDataList);
    }, [agendaDataList])
}