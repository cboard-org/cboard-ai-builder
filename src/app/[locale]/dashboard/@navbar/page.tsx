import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import styles from './styles.module.css';
import Typography from '@mui/material/Typography';
import { getServerSession } from 'next-auth';
import authConfig from '@/lib/next-auth/config';
import { getTranslations } from 'next-intl/server';
import Tooltip from '@mui/material/Tooltip';
import Logout from '@mui/icons-material/Logout';
import Brand from '@/components/icons/Brand';
import SvgIcon from '@mui/material/SvgIcon';

export default async function DashboardPage() {
  const messages = await getTranslations('Navbar');
  const session = await getServerSession(authConfig);
  return (
    <Box className={styles.header}>
      <IconButton
        sx={{
          backgroundColor: '#f8f8f8',
          borderRadius: '8px',
          width: 'max-content',
        }}
      >
        <MenuIcon />
      </IconButton>
      {/* TODO: remove this when menu items are done */}
      <Tooltip title={`Logged in as: ${session?.user?.name}`}>
        <IconButton href="/api/auth/signout">
          <Logout />
        </IconButton>
      </Tooltip>
      <Box className={styles.brand}>
        <SvgIcon>
          <Brand />
        </SvgIcon>

        <Typography
          variant="h6"
          fontSize={'1rem'}
          component="div"
          sx={{ flexGrow: 1 }}
          ml={0.5}
        >
          <Box component="span" fontWeight="bold">
            {messages('ai')}
          </Box>
          {' ' + messages('cbuilder')}
        </Typography>
      </Box>
    </Box>
  );
}
