import { SxProps } from '@mui/system/styleFunctionSx/styleFunctionSx';
import { PURPLE } from './constants';

export const styles = {
  root: {
    background: { xs: PURPLE, md: 'white' },
    width: '100%',
    height: '100%',
    px: 2,
    py: 2,
  },
  grid: {
    height: '100%',
    display: 'grid',
    gridTemplateAreas: {
      xs: `"sign-actions"
      "hero"`,
      md: `"hero sign-actions"`,
    },
  },
  hero: {
    gridArea: 'hero',
    background: PURPLE,
    borderRadius: '16px',
    height: '100%',
    maxWidth: { md: '846px' },
    display: { xs: 'none', md: 'block' },
  },
  brandIcon: { fontSize: '50px', height: '52px', pr: '7px' },
  brandIconSmall: { fontSize: '34px', height: '25px', pr: '7px' },
  chipAI: { backgroundColor: '#363636', color: 'white' },
  signActions: {
    gridArea: 'sign-actions',
    background: { xs: PURPLE, md: 'inherit' },
    width: { xs: '100%' },
  },
  signActionsContainer: {
    gap: 2,
    mx: { md: 20 },
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
