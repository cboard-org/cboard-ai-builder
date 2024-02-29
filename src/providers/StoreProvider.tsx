import ComposeComponents from '@/utils/combineComponents';
import { PromptStoreProvider } from './prompt-store-provider';

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ComposeComponents components={[PromptStoreProvider]}>
      {children}
    </ComposeComponents>
  );
}
