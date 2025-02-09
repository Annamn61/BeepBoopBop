import { findMeasureByNumber } from "../../../data/measureData";
import './BillCard.css'

interface BillProps {
    bill: any, //TODO: Fix any
}

const Bill = ({bill}: BillProps) => {
    const position = findMeasureByNumber(bill.value[0].MeasureNumber)?.position;
    const measureDocURL = bill.value[0].MeasureDocuments?.[0]?.DocumentUrl;
    const committeeCode = bill.value[0].CurrentCommitteeCode;
    const billTitle = bill.value[0].RelatingTo;

    return (
    <a className='bill' href={measureDocURL} target='_blank'>
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
                {`${bill.value[0].MeasurePrefix} ${bill.value[0].MeasureNumber}`}
            </div>
        </div>
    </a>
    );
}

export default Bill;