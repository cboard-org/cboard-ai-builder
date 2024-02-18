import { SxProps } from '@mui/system/styleFunctionSx/styleFunctionSx';
import { PURPLE } from './constants';

export const styles = {
  root: {
    background: { xs: PURPLE, md: 'white' },
    width: '100%',
    height: '100%',

    py: 2,
  },
  grid: {
    height: '100%',
    width: '100%',
    display: 'grid',
    gridTemplateAreas: {
      xs: `"sign-actions"
      "hero"`,
      md: `"hero sign-actions"`,
    },
    gridTemplateColumns: { xs: '1fr', md: '3fr 2fr' },
  },
  hero: {
    gridArea: 'hero',
    background: PURPLE,
    borderRadius: 2,
    maxHeight: '100%',
    display: { xs: 'none', md: 'flex' },
    flexDirection: 'column',
    justifyContent: 'space-between',
    overflow: 'hidden',
    ml: { xs: 0, md: 2 },
    pt: { md: 2 },
  },
  heroBranding: {
    height: '100%',
    ml: { md: 2, lg: 4, xl: 7 },
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    // mt: 8,
    // alignItems: 'center',
  },
  brand: { pb: 4 },
  brandIcon: { fontSize: '50px', height: '52px', pr: '7px' },
  brandIconSmall: { fontSize: '34px', height: '25px', pr: '7px' },
  heroTextContainer: {
    width: 'min-content',
    maxWidth: '100%',
  },
  chipAI: { backgroundColor: '#363636', color: 'white' },
  signActions: {
    gridArea: 'sign-actions',
    background: { xs: PURPLE, md: 'inherit' },
    width: { xs: '100%', md: 'auto' },
    display: 'flex',
    justifyContent: 'center',
  },
  signActionsContainer: {
    gap: 2,
    width: '80%',
    maxWidth: { xs: 'inherit', md: '352px' },
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeTextContainer: {
    alignSelf: { xs: 'center', md: 'start' },
    textAlign: { xs: 'center', md: 'inherit' },
  },
  holaText: {
    fontWeight: 600,
    fontSize: { xs: '32px', md: '48px' },
    color: '#181717',
    pb: '16px',
  },
  welcomeText: { color: '#2B2B2B', fontSize: '16px' },
  divider: { my: 4, borderColor: { xs: '#6D6D6D', md: '#C9C9C9' } },
  bottomLinks: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    color: { xs: '#221152', md: '#868686' },
    fontWeight: { xs: 500, sm: 400 },
    fontSize: { xs: '12px', md: '16px' },
  },
  bottomImage: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    display: { md: 'none' },
  },
} satisfies Record<string, SxProps>;
