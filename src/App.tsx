import Box from '@mui/material/Box';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import { useState } from 'react';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { HashRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { SnackbarProvider } from './components/Accessories/Snackbar/Snackbar';
import { BillLocationBoard } from './components/Pages/BillLocationBoard/BillLocationBoard';
import MeetingCalendar from './components/Pages/Calendar/Calendar';
import { MeasureHistory } from './components/Pages/MeasureHistory/MeasureHistory';
import Parser from './components/Pages/Parser/Parser';
import Header from './components/Things/Header/Header';
import PageTabs from './components/Things/PageTabs/PageTabs';
import { Sidebar } from './components/Things/Sidebar/Sidebar';
import { useDataController } from './data/Controllers/dataController';
import theme from './utils/theme';
import { styles } from './App.styles';
import Measure from './components/Pages/Measure/Measure';
// import Votes from './components/Pages/Votes/Votes';

function App() {
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const stored = sessionStorage.getItem('gh-path');
  if (stored) {
    sessionStorage.removeItem('gh-path');

    if (
      stored !==
      window.location.pathname + window.location.search + window.location.hash
    ) {
      history.replaceState(null, '', stored);
    }
  }
  useDataController();

  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider />
      <div className="app-container">
        <Sidebar open={sidebarIsOpen} setOpen={setSidebarIsOpen} />
        <Box
          sx={{
            ...styles.contentContainer,
            paddingLeft: sidebarIsOpen ? '348px' : '0px',
          }}
        >
          <Header />
          <PageTabs
            selectedPage={'location'}
            setSelectedPage={() => console.log('set tab')}
          />
          <HashRouter>
            <Routes>
              <Route path="/" element={<MeasureHistory />} />
              <Route path="/bill/:id" element={<Measure />} />
              <Route path="/parser" element={<Parser />} />
              <Route path="/calendar" element={<MeetingCalendar />} />
              <Route path="/updates" element={<MeasureHistory />} />
              <Route
                path="/locations"
                element={<BillLocationBoard sidebarIsOpen={sidebarIsOpen} />}
              />
              {/* <Route path="/votes/:id" element={<Votes />} /> */}
            </Routes>
          </HashRouter>
        </Box>
      </div>
    </ThemeProvider>
  );
}

export default App;
