import TextField from '@mui/material/TextField';
import { styles } from './SearchBar.styles';

interface Props {}

const SearchBar = ({}: Props) => {
  return <TextField sx={styles.input} />;
};

export default SearchBar;
