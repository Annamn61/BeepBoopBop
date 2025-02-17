import useBillStore from "../../../store/MeasureStore";
import './BillCard.css'

interface BillProps {
    billId: string,
}

const Bill = ({ billId }: BillProps) => {
    const committeeCode = useBillStore.getState().getMeasureCommitteeNameById(billId);
    const position = useBillStore.getState().getUserTrackedMeasurePositionById(billId);
    const measureDocURL = useBillStore.getState().getMeasureDocumentUrlById(billId);
    const billTitle = useBillStore.getState().getMeasureTitleById(billId);
    const measureColor = useBillStore.getState().getUserMeasureColorById(billId)

    return (
    <a style={{borderLeft: `6px solid ${measureColor}`}} className='bill' href={measureDocURL} target='_blank' key={billId}>
        <div className="bill-title">
            {billTitle}
        </div>
        {committeeCode && <div className="bill-committee">
            {committeeCode}
        </div>}
        <div className="bill-additonal-info">
            <div className="bill-position">
                {position === 'Support' ? '🌍' : '🚨'}
            </div>
            <div className={`bill-number ${position === 'Support' ? 'bill-number-green' : 'bill-number-orange'}`} >
                {billId}
            </div>
        </div>
    </a>
    );
}

export default Bill;