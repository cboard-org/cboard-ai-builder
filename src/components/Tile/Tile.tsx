import React, { ReactNode } from 'react';
import style from './Tile.module.css';
import Symbol from '../Symbol';
import { TileRecord } from './types';

type Props = {
  children?: ReactNode;
  tile: TileRecord;
};

export default function Tile({ tile }: Props) {
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

  return (
    <button className={style.Tile} type="button">
      <div
        className={style.TileShape}
        style={tileShapeStyles}
        data-isfolder={isFolder}
      />
      <Symbol
        image={tile.image}
        label={tile.label}
        labelpos={displaySettings.labelPosition}
      />
      {/* {isSelecting && !isSaving && (
          <div className="CheckCircle">
            {isSelected && <CheckCircleIcon className={style.CheckCircleIcon} />}
          </div>
        )} */}
    </button>
  );
}