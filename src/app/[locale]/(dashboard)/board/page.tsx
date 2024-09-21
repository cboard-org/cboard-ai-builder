import InitialContent from './components/InitialContent/InitialContent';
import { PromptForm } from './components/promptForm/PromptForm';
import { useMessages } from 'next-intl';
import pick from 'lodash.pick';
import { NextIntlClientProvider } from 'next-intl';
import { Box } from '@mui/system';
import styles from './styles';

export default function DashboardPage() {
  const messages = useMessages();
  return (
    <NextIntlClientProvider messages={pick(messages, ['PromptForm', 'Board'])}>
      <Box sx={styles.initialContentContainer}>
        <InitialContent newBoard />
      </Box>
      <Box sx={styles.promptContainer}>
        <PromptForm />
      </Box>
    </NextIntlClientProvider>
  );
}
