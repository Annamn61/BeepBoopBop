import Box from '@mui/material/Box';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { HashRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import LayoutPage from './components/Accessories/LayoutPage/LayoutPage';
import { SnackbarProvider } from './components/Accessories/Snackbar/Snackbar';
import { BillLocationBoard } from './components/Pages/BillLocationBoard/BillLocationBoard';
import MeetingCalendar from './components/Pages/Calendar/Calendar';
import DocumentViewer from './components/Pages/Measure/DocumentViewer/DocumentViewer';
import Measure from './components/Pages/Measure/Measure';
import MeasureHistory from './components/Pages/MeasureHistory/MeasureHistory';
import Parser from './components/Pages/Parser/Parser';
import Votes from './components/Pages/Votes/Votes';
import { useDataController } from './data/Controllers/dataController';
import theme from './utils/theme';

function App() {
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
        <HashRouter>
          <Routes>
            <Route
              path="/"
              element={<LayoutPage children={<MeasureHistory />} />}
            />
            <Route
              path="/bill/:id/document/:name"
              element={<LayoutPage children={<DocumentViewer />} />}
            />
            <Route
              path="/bill/:id"
              element={<LayoutPage children={<Measure />} />}
            />
            <Route
              path="/parser"
              element={<LayoutPage children={<Parser />} />}
            />
            <Route
              path="/calendar"
              element={<LayoutPage children={<MeetingCalendar />} />}
            />
            <Route
              path="/updates"
              element={<LayoutPage children={<MeasureHistory />} />}
            />
            <Route
              path="/location"
              element={
                <LayoutPage
                  shouldLayoutChildren={false}
                  children={<BillLocationBoard sidebarIsOpen={true} />}
                />
              }
            />
            <Route
              path="/votes/:id"
              element={<LayoutPage children={<Votes />} />}
            />
            <Route
              path="*"
              element={
                <LayoutPage children={<Box>We can't find this page</Box>} />
              }
            />
          </Routes>
        </HashRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
