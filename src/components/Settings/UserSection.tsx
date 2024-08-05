import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItem from '@mui/material/ListItem';
import ListSubheader from '@mui/material/ListSubheader';
import Avatar from '@mui/material/Avatar';
import { useTranslations } from 'next-intl';
import IconButton from '@mui/material/IconButton';
import Logout from '@mui/icons-material/Logout';
import Tooltip from '@mui/material/Tooltip';
import { useSession, signOut } from 'next-auth/react';
import { useLocale } from 'next-intl';
import { styles } from './styles';
import { SIGNIN_PATH } from '@/app/[locale]/signin/constants';

export default function UserSection() {
  const locale = useLocale();
  const messages = useTranslations('Settings');

  const { data: session } = useSession();
  return (
    <List
      subheader={
        <ListSubheader component="div" id="user">
          {messages('user')}
        </ListSubheader>
      }
    >
      <ListItem
        secondaryAction={
          <Tooltip title={messages('signOut')}>
            <IconButton
              onClick={() =>
                signOut({
                  redirect: true,
                  callbackUrl: locale
                    ? `/${locale}${SIGNIN_PATH}`
                    : SIGNIN_PATH,
                })
              }
            >
              <Logout />
            </IconButton>
          </Tooltip>
        }
        disablePadding
      >
        <ListItemButton>
          <ListItemAvatar>
            {session?.user?.image ? (
              <Avatar alt={'user image'} src={session?.user?.image} />
            ) : (
              <Avatar sx={styles.avatar}>
                {session?.user?.name?.charAt(0).toUpperCase()}
              </Avatar>
            )}
          </ListItemAvatar>
          <ListItemText
            id={'labelId'}
            primary={session?.cboard_user.name || ''}
          />
        </ListItemButton>
      </ListItem>
    </List>
  );
}
