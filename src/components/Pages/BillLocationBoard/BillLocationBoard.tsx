import './BillLocationBoard.css';
import {
  errorColumn,
  renderedKanbanLocations,
} from './Locations/Locations.helpers';
import GroupTitle from './GroupTitle/GroupTitle';
import Section from './Section/Section';
import useMeasureStore from '../../../store/MeasureStore';
import Box from '@mui/material/Box';
import { styles } from './BillLocationBoard.styles';

interface BillLocationBoardProps {
  sidebarIsOpen: boolean;
}

export const BillLocationBoard = ({
  sidebarIsOpen,
}: BillLocationBoardProps) => {
  const hasErrantMeasures = useMeasureStore
    .getState()
    .getHasKanbanSortingError();

  return (
    <Box className="kanban-container">
      <Box className="kanban-content">
        <Box
          sx={{
            ...styles.groupsContainer,
            paddingLeft: sidebarIsOpen ? 6 : 12,
            transition: '0.3s all ease-in-out',
          }}
        >
          {[
            ...(hasErrantMeasures ? errorColumn : []),
            ...renderedKanbanLocations,
          ].map((group) => {
            return (
              <Box className="group" key={group.group}>
                <GroupTitle group={group} />
                <Box sx={styles.sectionsContainer}>
                  {group.data.map((section) => (
                    <Section
                      key={`${group.group}-${section.section}`}
                      sectionData={section}
                      groupTitle={group.group}
                      sectionTitle={section.section}
                    />
                  ))}
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};
