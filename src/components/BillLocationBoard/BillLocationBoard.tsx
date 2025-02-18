import './BillLocationBoard.css'
import { errorColumn, renderedKanbanLocations } from './Locations/Locations.helpers';
import GroupTitle from './GroupTitle/GroupTitle';
import Section from './Section/Section';
import useMeasureStore from '../../store/MeasureStore';

export const BillLocationBoard = () => {
    const hasErrantMeasures = useMeasureStore.getState().getHasKanbanSortingError();

    return (
    <div className="kanban-container">
        <div className="kanban-content">
            <div className="groups-container">
            {[...(hasErrantMeasures ? errorColumn : []), ...renderedKanbanLocations].map((group) => {
                return (
                    <div className="group" key={group.group}>
                        <GroupTitle group={group} />
                        <div className="sections-container"> 
                            {group.data.map((section) => (
                                <Section
                                    key={`${group.group}-${section.section}`}
                                    sectionData={section}
                                    groupTitle={group.group}
                                    sectionTitle={section.section}
                                />
                            ))}
                        </div>
                </div>
                )
            })}
            </div>
        </div>
    </div>
)}