import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import MeasurePill from '../MeasurePill/MeasurePill';
import { styles } from './Breadcrumbs.styles';

interface Props {
  measureId: string;
  pagesList: {
    title: string;
    url: string;
  }[];
  lastPageTitle: string;
}

const Breadcrumbs = ({ measureId, pagesList, lastPageTitle }: Props) => {
  return (
    <Box sx={styles.breadcrumbsContainer}>
      <MeasurePill
        id={measureId}
        withModal={false}
        shouldNavigateToBillOnClick={true}
      />
      <Typography>/</Typography>
      {pagesList.map((page) => {
        return (
          <>
            <Link to={page.url}>{page.title}</Link>
            <Typography>/</Typography>
          </>
        );
      })}
      <Typography>{lastPageTitle}</Typography>
    </Box>
  );
};

export default Breadcrumbs;
