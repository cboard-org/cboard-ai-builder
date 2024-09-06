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
import ISO6391 from 'iso-639-1';
import useIsSmallScreen from '@/hooks/useIsSmallScreen';
import { useColorScheme } from '@mui/material/styles';
import ContrastIcon from '@mui/icons-material/Contrast';

type ColorTheme = 'system' | 'dark' | 'light';
const themeOptions = ['system', 'dark', 'light'];

export default function AppSection() {
  const router = useRouter();
  const pathname = usePathname();
  const messages = useTranslations('Settings');
  const locale = useLocale();
  const isSmallScreen = useIsSmallScreen();
  const { mode, setMode } = useColorScheme();

  const handleOnChange = (event: SelectChangeEvent<string>) => {
    const nextLocale = event.target.value;

    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  };

  const getNativeName = (locale: string) => {
    const countryCode = locale.slice(0, 2);
    return ISO6391.getNativeName(countryCode);
  };

  return (
    <List
      subheader={
        <ListSubheader component="div" id="application-subheader">
          {messages('application')}
        </ListSubheader>
      }
    >
      <ListItem
        secondaryAction={
          <FormControl sx={styles.formControl} size="small">
            <Select
              labelId="language-select-label"
              id="language-select"
              value={locale}
              onChange={handleOnChange}
            >
              {supportedLocales.map((locale) => (
                <MenuItem key={locale} value={locale}>
                  {(isSmallScreen
                    ? ''
                    : locale.slice(0, 2).toUpperCase() + ' - ') +
                    getNativeName(locale)}
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
          <ListItemText id={'language'} primary={messages('language')} />
        </ListItemButton>
      </ListItem>
      <ListItem
        disablePadding
        secondaryAction={
          <FormControl sx={styles.formControl} size="small">
            <Select
              labelId="theme-color-select"
              id="theme-color-select"
              value={mode || 'system'}
              onChange={(event) => {
                const value = event.target.value;
                setMode(value as ColorTheme);
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
            <ContrastIcon />
          </ListItemIcon>
          <ListItemText id={'theme-switch'} primary={messages('theme')} />
        </ListItemButton>
      </ListItem>
    </List>
  );
}
