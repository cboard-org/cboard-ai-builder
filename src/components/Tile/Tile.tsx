import React, { ReactNode } from 'react';
import style from './Tile.module.css';
import Symbol from '../Symbol';
import { TileRecord, LabelPositionRecord } from '@/commonTypes/Tile';
import Box from '@mui/material/Box';
import TileEditor from '@/components/TileEditor/TileEditor';

type Props = {
  children?: ReactNode;
  tile: TileRecord;
  handleTileClick: (id: string) => void;
  isEditionView?: boolean;
};

export default function Tile({ tile, handleTileClick, children }: Props) {
  const displaySettings = {
    labelPosition: 'Below',
  } as { labelPosition: LabelPositionRecord }; // TODO: get from settings
  const [isEditing, setIsEditing] = React.useState(false);
  const isFolder = Boolean(tile.loadBoard);

  const tileShapeStyles = { borderColor: '', backgroundColor: '' };

  if (tile.borderColor) {
    tileShapeStyles.borderColor = tile.borderColor;
  }

  if (tile.backgroundColor) {
    tileShapeStyles.backgroundColor = tile.backgroundColor;
  }

  const onTileClick = () => {
    setIsEditing(true);
    handleTileClick(tile.id);
  };

  return (
    <TileEditor
      isEditing={isEditing}
      onClose={() => {
        setIsEditing(false);
      }}
      tile={tile}
    >
      <button className={style.Tile} type="button" onClick={onTileClick}>
        <div
          className={style.TileShape}
          style={tileShapeStyles}
          data-isfolder={isFolder}
        />
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            height: '100%',
            width: '100%',
          }}
        >
          <Symbol
            image={tile.image}
            label={tile.label}
            labelpos={displaySettings.labelPosition}
            tileId={tile.id}
          />
        </Box>
        {children}
      </button>
    </TileEditor>
  );
}
