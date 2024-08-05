import React from 'react';
import Modal from '../Modal/Modal';
import IconButton from '@mui/material/IconButton';
import SettingsIcon from '@mui/icons-material/Settings';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Logout from '@mui/icons-material/Logout';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItem from '@mui/material/ListItem';
import ListSubheader from '@mui/material/ListSubheader';
import Avatar from '@mui/material/Avatar';
import { useTranslations } from 'next-intl';
import LanguageIcon from '@mui/icons-material/Language';
import CloseIcon from '@mui/icons-material/Close';
import ListItemIcon from '@mui/material/ListItemIcon';
import Paper from '@mui/material/Paper';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { signOut } from 'next-auth/react';
import { useLocale } from 'next-intl';

export default function Settings() {
  const [open, setOpen] = React.useState(false);
  const locale = useLocale();
  const messages = useTranslations('Settings');

  const handleOnClick = () => {
    setOpen(true);
  };
  const handleOnClose = () => {
    setOpen(false);
  };
  return (
    <>
      <IconButton onClick={handleOnClick}>
        <SettingsIcon fontSize="small" />
      </IconButton>
      <Modal onClose={handleOnClose} open={open}>
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleOnClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              {messages('title')}
            </Typography>
          </Toolbar>
        </AppBar>
        <Paper sx={{ mx: { md: 5, xs: 1 }, mt: 1 }}>
          <List
            subheader={
              <ListSubheader component="div" id="user">
                {messages('user')}
              </ListSubheader>
            }
          >
            <ListItem
              secondaryAction={
                <IconButton
                  onClick={() =>
                    signOut({
                      redirect: true,
                      callbackUrl: locale ? `/${locale}/signin` : '/signin',
                    })
                  }
                >
                  <Logout />
                </IconButton>
              }
              disablePadding
            >
              <ListItemButton>
                <ListItemAvatar>
                  <Avatar
                    alt={'user image'}
                    src={'https://material-ui.com/static/images/avatar/1.jpg'}
                  />
                </ListItemAvatar>
                <ListItemText id={'labelId'} primary={`Line item `} />
              </ListItemButton>
            </ListItem>
          </List>
          {/* <Divider /> */}
          <List
            subheader={
              <ListSubheader component="div" id="nested-list-subheader">
                {messages('application')}
              </ListSubheader>
            }
          >
            <ListItem
              secondaryAction={
                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
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
        </Paper>
      </Modal>
    </>
  );
}
