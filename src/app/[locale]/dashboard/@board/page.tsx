//import InitialContent from './InitialContent';
import BoardContainer from './BoardContainer';
import { NextIntlClientProvider, useMessages } from 'next-intl';
import pick from 'lodash.pick';

export default function BoardPage() {
  const messages = useMessages();
  //return <InitialContent />;
  return (
    <NextIntlClientProvider messages={pick(messages, 'Board')}>
      <BoardContainer />
    </NextIntlClientProvider>
  );
}
