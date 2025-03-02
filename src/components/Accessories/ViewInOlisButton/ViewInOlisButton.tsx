import Button from '@mui/material/Button';
import LaunchRoundedIcon from '@mui/icons-material/LaunchRounded';
import { styles } from './ViewInOlisButton.styles';

interface Props {
  url: string;
}

const ViewInOlisButton = ({ url }: Props) => {
  return (
    <Button variant="outlined" href={url} target="_blank">
      View in OLIS
      <LaunchRoundedIcon sx={styles.launchIcon} fontSize="small" />
    </Button>
  );
};

export default ViewInOlisButton;
