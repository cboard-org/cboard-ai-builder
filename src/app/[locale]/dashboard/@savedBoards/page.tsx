import { NextIntlClientProvider } from 'next-intl';
import { getSavedBoardsData } from './actions';
import SavedBoardList from './SavedBoardList';

export default async function Page() {
  const data = await getSavedBoardsData();
  return (
    <NextIntlClientProvider>
      <SavedBoardList initialData={data} />
    </NextIntlClientProvider>
  );
}
