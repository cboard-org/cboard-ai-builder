import React, { ReactNode } from 'react';
import style from './Tile.module.css';
import Symbol from '../Symbol';
import { TileRecord } from './types';

type Props = {
  children?: ReactNode;
  tile: TileRecord;
  handleTileClick: (id: string) => void;
};

export default function Tile({ tile, handleTileClick, children }: Props) {
  const displaySettings = {
    labelPosition: 'Below',
  }; // TODO: get from settings

  const variant = Boolean(tile.loadBoard) ? 'folder' : 'button';
  const isFolder = variant === 'folder';

  const tileShapeStyles = { borderColor: '', backgroundColor: '' };

  if (tile.borderColor) {
    tileShapeStyles.borderColor = tile.borderColor;
  }

  if (tile.backgroundColor) {
    tileShapeStyles.backgroundColor = tile.backgroundColor;
  }

  const onTileClick = () => {
    handleTileClick(tile.id);
  };

  return (
    <button className={style.Tile} type="button" onClick={onTileClick}>
      <div
        className={style.TileShape}
        style={tileShapeStyles}
        data-isfolder={isFolder}
      />
      <Symbol
        image={tile.image}
        label={tile.id}
        labelpos={displaySettings.labelPosition}
      />
      {children}
    </button>
  );
}
