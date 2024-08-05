import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import LanguageIcon from '@mui/icons-material/Language';
import { useTranslations } from 'next-intl';
import { styles } from './styles';

export default function AppSection() {
  const messages = useTranslations('Settings');
  return (
    <List
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          {messages('application')}
        </ListSubheader>
      }
    >
      <ListItem
        secondaryAction={
          <FormControl sx={styles.formControl} size="small">
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              // value={age}
              // onChange={handleChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        }
        disablePadding
      >
        <ListItemButton>
          <ListItemIcon>
            <LanguageIcon />
          </ListItemIcon>
          <ListItemText id={'labelId'} primary={`Language `} />
        </ListItemButton>
      </ListItem>
    </List>
  );
}
