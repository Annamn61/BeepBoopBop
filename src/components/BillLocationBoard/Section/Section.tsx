import Bill from '../BillCard/BillCard';
import './Section.css'
import SectionHeader from './SectionHeader/SectionHeader';
import StatusTitle from './StatusTitle/StatusTitle';

interface SectionProps {
    sectionData: {data: any, section: string},
    billsInStatuses: any,
}

const getSectionBillCount = (billsInStatuses: any, statusData: any) => {
    let totalCount = 0;
    statusData.forEach((status: {data: any, status: string}) => {
        status.data.forEach((sublocation: string) => {
            const bills = billsInStatuses?.[status.status]?.[sublocation];
            if(bills) {
                totalCount += bills.length;
            }
        })
    })
    return totalCount;
}

const Section = ({sectionData, billsInStatuses}: SectionProps) => {
    const {section, data} = sectionData;
    const billCount = getSectionBillCount(billsInStatuses, data);

    return (
        <div className="section">
        <SectionHeader title={section} billCount={billCount}/>
        {data.map((status: {data: any, status: string}) => (
            <div className="status-container">
                <StatusTitle title={status.status} />
                <div className="sublocations-container">
                {status.data.map((sublocation: string) => (
                    <>
                        <div className="sublocation-title">{sublocation}</div>
                        {(billsInStatuses?.[status.status]?.[sublocation] || []).map((bill: any) => (<Bill bill={bill} />))}
                    </>
                ))}
                </div>
            </div>
        ))}
    </div>
    );
}

export default Section;