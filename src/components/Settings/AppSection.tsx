import React from 'react';
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import LanguageIcon from '@mui/icons-material/Language';
import { useLocale, useTranslations } from 'next-intl';
import { styles } from './styles';
import { supportedLocales } from '@/intl/intl.constants';
import { startTransition } from 'react';
import { useRouter, usePathname } from '@/navigation';
import { useBoundStore } from '@/providers/StoreProvider';
import { useShallow } from 'zustand/react/shallow';

type ColorTheme = 'auto' | 'dark' | 'light';
const themeOptions = ['auto', 'dark', 'light'];

export default function AppSection() {
  const router = useRouter();
  const pathname = usePathname();
  const messages = useTranslations('Settings');
  const locale = useLocale();
  const [theme, setTheme] = useBoundStore(
    useShallow((state) => [state.theme, state.setTheme]),
  );

  const handleOnChange = (event: SelectChangeEvent<string>) => {
    const nextLocale = event.target.value;

    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  };

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
              value={locale}
              onChange={handleOnChange}
            >
              {supportedLocales.map((locale) => (
                <MenuItem key={locale} value={locale}>
                  {locale.slice(0, 2).toUpperCase()}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        }
        disablePadding
      >
        <ListItemButton>
          <ListItemIcon>
            <LanguageIcon />
          </ListItemIcon>
          <ListItemText id={'labelId'} primary={messages('language')} />
        </ListItemButton>
      </ListItem>
      <ListItem
        disablePadding
        secondaryAction={
          <FormControl sx={styles.formControl} size="small">
            <Select
              labelId="theme-color-select"
              id="theme-color-select"
              value={theme}
              onChange={(event) => {
                const value = event.target.value;
                setTheme(value as ColorTheme);
              }}
            >
              {themeOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option.toUpperCase()}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        }
      >
        <ListItemButton>
          <ListItemIcon>
            <LanguageIcon />
          </ListItemIcon>
          <ListItemText id={'theme-switch'} primary={messages('theme')} />
        </ListItemButton>
      </ListItem>
    </List>
  );
}
