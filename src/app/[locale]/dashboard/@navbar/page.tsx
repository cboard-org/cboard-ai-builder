import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SvgIcon from '@mui/material/SvgIcon';
import styles from './styles.module.css';
import Typography from '@mui/material/Typography';
import { useTranslations } from 'next-intl';

const BrandIcon = () => (
  <SvgIcon>
    <svg
      width="24"
      height="24"
      viewBox="0 0 33 33"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="17.678"
        y="1.57644"
        width="17.9566"
        height="22.9421"
        rx="2.86322"
        transform="rotate(30 17.678 1.57644)"
        fill="#FFF176"
        stroke="black"
        strokeWidth="1.43161"
      />
      <rect
        x="25.3848"
        y="8.59863"
        width="5.53949"
        height="2.76974"
        rx="1.38487"
        transform="rotate(30 25.3848 8.59863)"
        fill="black"
      />
      <rect
        x="0.876678"
        y="7.24345"
        width="17.9566"
        height="22.9421"
        rx="2.86322"
        transform="rotate(-15 0.876678 7.24345)"
        fill="#D7B3FF"
        stroke="black"
        strokeWidth="1.43161"
      />
      <rect
        x="11"
        y="7.03223"
        width="5.53949"
        height="2.76974"
        rx="1.38487"
        transform="rotate(-15 11 7.03223)"
        fill="black"
      />
    </svg>
  </SvgIcon>
);

export default function DashboardPage() {
  const messages = useTranslations('Navbar');
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
      <Box className={styles.brand}>
        <BrandIcon />

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
          {messages('cbuilder')}
        </Typography>
      </Box>
    </Box>
  );
}
