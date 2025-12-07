import Box from '@mui/material/Box';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { styles } from '../../../App.styles';
import Header from '../../Things/Header/Header';
import PageTabs from '../../Things/PageTabs/PageTabs';
import { Sidebar } from '../../Things/Sidebar/Sidebar';
import { useState } from 'react';

interface Props {
  shouldLayoutChildren?: boolean;
  showSidebar?: boolean;
  showTabs?: boolean;
  children: React.ReactNode;
}

const LayoutPage = ({
  shouldLayoutChildren = true,
  showSidebar = true,
  showTabs = true,
  children,
}: Props) => {
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);

  if (shouldLayoutChildren) {
    return (
      <>
        {showSidebar && (
          <Sidebar open={sidebarIsOpen} setOpen={setSidebarIsOpen} />
        )}
        <Box
          sx={{
            ...styles.contentContainer,
            paddingLeft: {
              xs: '0px', // No padding on mobile - sidebar overlays
              md: showSidebar && sidebarIsOpen ? '348px' : '0px',
            },
          }}
        >
          <Box
            sx={{
              ...styles.regularPageContainers,
              paddingLeft: {
                xs: showSidebar && sidebarIsOpen ? 6 : 2,
                md: showSidebar && sidebarIsOpen ? 6 : 12,
              },
            }}
          >
            <Header />
            {showTabs && <PageTabs />}
            {children}
          </Box>
        </Box>
      </>
    );
  }

  return (
    <>
      {showSidebar && (
        <Sidebar open={sidebarIsOpen} setOpen={setSidebarIsOpen} />
      )}
      <Box
        sx={{
          ...styles.contentContainer,
          paddingLeft: {
            xs: '0px', // No padding on mobile - sidebar overlays
            md: showSidebar && sidebarIsOpen ? '348px' : '0px',
          },
        }}
      >
        <Box
          sx={{
            ...styles.regularPageContainers,
            paddingLeft: {
              xs: showSidebar && sidebarIsOpen ? 6 : 2,
              md: showSidebar && sidebarIsOpen ? 6 : 12,
            },
          }}
        >
          <Header />
          {showTabs && <PageTabs />}
        </Box>
        {children}
      </Box>
    </>
  );
};

export default LayoutPage;
