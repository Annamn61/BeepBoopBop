import { useEffect, useState } from 'react';
import { fetchMeasures } from '../../utils/ODataRquests';
import './BillLocationBoard.css'
import { getKanbanLocationFromBilLocation, renderedKanbanLocations } from './Locations/Locations.helpers';
import GroupTitle from './GroupTitle/GroupTitle';
import Section from './Section/Section';

export const BillLocationBoard = () => {

    const [billsInLocations, setBillsInLocations] = useState<any>({});

    useEffect(() => {
        let tempBillsInLocations: any = {}
    
        fetchMeasures().then(response => {
            response.forEach(bill => {
                if(bill?.value?.[0]) {
                    const {group, section, status, sublocation} = getKanbanLocationFromBilLocation(bill.value[0].CurrentLocation, bill.value[0].MeasurePrefix);
                    tempBillsInLocations[group] = tempBillsInLocations[group] || {};
                    tempBillsInLocations[group][section] = tempBillsInLocations[group][section] || {}
                    tempBillsInLocations[group][section][status] = tempBillsInLocations[group][section][status] || {}
                    tempBillsInLocations[group][section][status][sublocation] = tempBillsInLocations[group][section][status][sublocation] || []
                    tempBillsInLocations[group][section][status][sublocation] = [...tempBillsInLocations[group][section][status][sublocation], bill];
                };
            })
            setBillsInLocations(tempBillsInLocations);
        });
    
    }, []);



    return (
        <div className="kanban-container">
            <div className="kanban-title">KANBAN</div>
            <div className="kanban-content">
                <div className="groups-container">
                {renderedKanbanLocations.map((group) => {
                    return (
                        <div className="group">
                            <GroupTitle group={group} />
                            <div className="sections-container"> 
                                {group.data.map((section) => (
                                    <Section
                                        billsInStatuses={billsInLocations[group.group]?.[section.section]}
                                        sectionData={section}
                                    />
                                ))}
                            </div>
                    </div>
                    )
                })}
                </div>
            </div>
        </div>
    )
}