import { NextIntlClientProvider } from 'next-intl';
import { PromptForm } from './PromptForm';

export default function Page() {
  return (
    <NextIntlClientProvider>
      <PromptForm />
    </NextIntlClientProvider>
  );
}
