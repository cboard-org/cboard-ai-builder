import { useBoundStore } from '@/providers/StoreProvider';
import { useShallow } from 'zustand/react/shallow';
import useIsStashedContentView from '@/board/hooks/useIsStashedView';
import useIsRemoteContentView from '@/board/hooks/useIsRemoteContentView';
import { TileRecord } from '@/commonTypes/Tile';

const useUpdateTilePropsSaver = () => {
  const isStashedContentView = useIsStashedContentView();
  const isRemoteContentView = useIsRemoteContentView();

  const [updateTileProps, stashDashboard, board] = useBoundStore(
    useShallow((state) => [
      state.updateTileProps,
      state.stashDashboard,
      state.board,
    ]),
  );
  const updateTilePropsSaver = (tileId: string, tileProps: TileRecord) => {
    updateTileProps(tileId, tileProps, isRemoteContentView ? board : null);
    if (isStashedContentView) stashDashboard();
  };
  return updateTilePropsSaver;
};

export default useUpdateTilePropsSaver;
