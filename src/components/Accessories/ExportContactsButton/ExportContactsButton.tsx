import Button from '@mui/material/Button';
import DownloadIcon from '@mui/icons-material/Download';
import useLegislatorStore from '../../../store/LegislatorStore';
import { styles } from './ExportContactsButton.styles';

interface Props {
  legislatorCodes: string[];
  buttonText?: string;
}

const ExportContactsButton = ({ legislatorCodes, buttonText = "Export Contacts" }: Props) => {
  const { exportLegislatorContactsAsCSV } = useLegislatorStore();

  const handleClick = () => {
    const csvContent = exportLegislatorContactsAsCSV(legislatorCodes);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'legislator_contacts.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Button variant="outlined" onClick={handleClick}>
      <DownloadIcon sx={styles.downloadIcon} fontSize="small" />
      {buttonText}
    </Button>
  );
};

export default ExportContactsButton;