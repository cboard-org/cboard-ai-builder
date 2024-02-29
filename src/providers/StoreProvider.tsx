import ComposeComponents from '@/utils/combineComponents';
import { PromptStoreProvider } from './prompt-store-provider';
import { BoardStoreProvider } from './BoardStoreProvider';

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ComposeComponents components={[PromptStoreProvider, BoardStoreProvider]}>
      {children}
    </ComposeComponents>
  );
}
