import React from 'react';
import useMeasureStore from '../../../store/MeasureStore';
import Bill from '../BillCard/BillCard';
import './Section.css'
import SectionHeader from './SectionHeader/SectionHeader';
import StatusTitle from './StatusTitle/StatusTitle';

interface SectionProps {
    sectionData: {data?: any, section: string},
    groupTitle: string,
    sectionTitle: string,
}

const getSectionBillCount = (billsInStatuses: any) => {
    let totalCount = 0;
    if(billsInStatuses) {
        Object.keys(billsInStatuses).forEach((key) => {
            Object.keys(billsInStatuses[key]).forEach(sublocation => totalCount += billsInStatuses[key][sublocation].length)
        });
        return totalCount;
    }
    return totalCount;
}

const Section = ({sectionData, groupTitle, sectionTitle}: SectionProps) => {
    const {section, data} = sectionData;
    const measuresInKanbanLocations = useMeasureStore.getState().getMeasuresSortedIntoKanbanLocations();
    const billsInStatuses = measuresInKanbanLocations[groupTitle]?.[sectionTitle]
    const billCount = getSectionBillCount(billsInStatuses);

    const ErrorSection = () => (
            Object.keys(billsInStatuses).map((statusKey) =>  <div className="status-container" key={`${groupTitle}-${section}-${statusKey}`}>
                <StatusTitle title={statusKey} key={statusKey}/>
                {billsInStatuses[statusKey]['uncategorized'].map((bill: any) => <Bill billId={bill.id} key={bill.id} />)}
            </div>
    ));  

    return (
        <div className="section" key={`${groupTitle}-${section}`}>
        <SectionHeader title={section} billCount={billCount}/>
        {!data && <ErrorSection />}
        {data && data.map((status: {data: any, status: string}) => (
            <div className="status-container" key={`${groupTitle}-${section}-${status.status}`}>
                <StatusTitle title={status.status} key={status.status} />
                <div className="sublocations-container" key={'sublocation' + status.status}>
                {status.data.map((sublocation: string) => (
                    <React.Fragment key={sublocation}>
                        {sublocation && <div className="sublocation-title" key={sublocation}>{sublocation}</div>}
                        {(billsInStatuses?.[status.status]?.[sublocation] || []).map((bill: any) => (<Bill key={bill.id} billId={bill.id} />))}
                    </React.Fragment>
                ))}
                </div>
            </div>
        ))}
    </div>
    );
}

export default Section;