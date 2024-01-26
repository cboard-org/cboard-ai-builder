import { NextIntlClientProvider, useMessages } from 'next-intl';
import pick from 'lodash.pick';
import { PromptForm } from './PromptForm';

export default function Page() {
  const messages = useMessages();
  return (
    <NextIntlClientProvider messages={pick(messages, 'PromptForm')}>
      <PromptForm />
    </NextIntlClientProvider>
  );
}
