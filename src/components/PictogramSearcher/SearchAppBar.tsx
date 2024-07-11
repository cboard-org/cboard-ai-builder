import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from '@mui/icons-material/Search';
import { useMemo } from 'react';
import debounce from 'lodash.debounce';
import { useLocale } from 'next-intl';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

type SearchAppBarProps = {
  onArrowBackClick: () => void;
  setSuggestions: {
    setSearchSuggestions: (results: string[]) => void;
    setIsError: (error: boolean) => void;
    setIsLoading: (value: boolean) => void;
    setIsEmptyResults: (value: boolean) => void;
  };
};
export default function SearchAppBar({
  onArrowBackClick,
  setSuggestions: {
    setSearchSuggestions,
    setIsError,
    setIsLoading,
    setIsEmptyResults,
  },
}: SearchAppBarProps): JSX.Element {
  const locale = useLocale();
  const fetchSuggestions = React.useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const arasaacPictogramsSearch = async (
        locale = 'en',
        searchText = '',
      ) => {
        setIsEmptyResults(false);
        if (searchText.length === 0) return [];
        setSearchSuggestions([]);
        setIsLoading(true);
        const ARASAAC_BASE_PATH_API = 'https://api.arasaac.org/api/';
        const slicedLocale = locale.slice(0, 2);
        const pictogSearchTextPath = `${ARASAAC_BASE_PATH_API}pictograms/${slicedLocale}/search/${searchText}`;
        try {
          setIsError(false);
          const res = await fetch(pictogSearchTextPath);
          const data = await res.json();
          if (res.status === 200 && data) {
            return data.map((pictogram: { _id: number }) => pictogram._id);
          }
          if (res.status === 404 && data) {
            setIsEmptyResults(true);
            return [];
          }
        } catch (err) {
          setIsError(true);
          return [];
        } finally {
          setIsLoading(false);
        }
      };

      const suggestionsIds = await arasaacPictogramsSearch(
        locale,
        e.target.value,
      );
      setSearchSuggestions(suggestionsIds);
      return;
    },
    [setSearchSuggestions, setIsError, setIsEmptyResults, setIsLoading, locale],
  );

  const debouncedChangeHandler = useMemo(
    () =>
      debounce((value) => {
        fetchSuggestions(value);
      }, 600),
    [fetchSuggestions],
  );
  return (
    <Box borderRadius={2}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={onArrowBackClick}
          >
            <ArrowBackIcon />
          </IconButton>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              onChange={debouncedChangeHandler}
            />
          </Search>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
