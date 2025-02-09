import './BillLocationBoard.css'
import { renderedKanbanLocations } from './Locations/Locations.helpers';
import GroupTitle from './GroupTitle/GroupTitle';
import Section from './Section/Section';

export const BillLocationBoard = () => (
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
)