import Button from '@mui/material/Button';
import EmailIcon from '@mui/icons-material/Email';
import { styles } from './SendEmailButton.styles';

interface Props {
  emails: string[];
  buttonText?: string;
}

const SendEmailButton = ({ emails, buttonText = "Send Email" }: Props) => {
  const handleClick = () => {
    if (emails.length === 0) return;

    const [to, ...bcc] = emails;
    const mailtoLink = `mailto:${to}?bcc=${bcc.join(',')}`;

    window.location.href = mailtoLink;
  };

  return (
    <Button variant="outlined" onClick={handleClick}>
      <EmailIcon sx={styles.emailIcon} fontSize="small" />
      {buttonText}
    </Button>
  );
};

export default SendEmailButton;