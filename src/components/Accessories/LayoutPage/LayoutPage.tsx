import Box from '@mui/material/Box';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { styles } from '../../../App.styles';
import Header from '../../Things/Header/Header';
import PageTabs from '../../Things/PageTabs/PageTabs';
import { Sidebar } from '../../Things/Sidebar/Sidebar';
import { useState } from 'react';

interface Props {
  shouldLayoutChildren?: boolean;
  children: React.ReactNode;
}

const LayoutPage = ({ shouldLayoutChildren = true, children }: Props) => {
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);

  if (shouldLayoutChildren) {
    return (
      <>
        <Sidebar open={sidebarIsOpen} setOpen={setSidebarIsOpen} />
        <Box
          sx={{
            ...styles.contentContainer,
            paddingLeft: sidebarIsOpen ? '348px' : '0px',
          }}
        >
          <Box
            sx={{
              ...styles.regularPageContainers,
              paddingLeft: sidebarIsOpen ? 6 : 12,
            }}
          >
            <Header />
            <PageTabs />
            {children}
          </Box>
        </Box>
      </>
    );
  }

  return (
    <>
      <Sidebar open={sidebarIsOpen} setOpen={setSidebarIsOpen} />
      <Box
        sx={{
          ...styles.contentContainer,
          paddingLeft: sidebarIsOpen ? '348px' : '0px',
        }}
      >
        <Box
          sx={{
            ...styles.regularPageContainers,
            paddingLeft: sidebarIsOpen ? 6 : 12,
          }}
        >
          <Header />
          <PageTabs />
        </Box>
        {children}
      </Box>
    </>
  );
};

export default LayoutPage;
