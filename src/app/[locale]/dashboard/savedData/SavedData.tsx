import { NextIntlClientProvider } from 'next-intl';
import TabSelector from './Selector';

export default function SavedData(props: { history: React.ReactNode }) {
  return (
    <NextIntlClientProvider>
      <TabSelector history={props.history}></TabSelector>
    </NextIntlClientProvider>
  );
}
