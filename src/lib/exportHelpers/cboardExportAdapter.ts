import { BoardRecord } from '@/commonTypes/Board';
import { EXPORT_CONFIG_BY_TYPE } from './constants';

const getDatetimePrefix = () => new Date().toString();

declare global {
  interface Navigator {
    msSaveBlob?: (blob: Blob, defaultName?: string) => boolean;
  }
}

export async function cboardExportAdapter(boards: BoardRecord[]) {
  const jsonData = new Blob([JSON.stringify(boards)], {
    type: 'text/json;charset=utf-8;',
  });

  if (jsonData) {
    let prefix = getDatetimePrefix();
    if (boards.length === 1) {
      const name = boards[0].name?.split(' ').join('-').substring(0, 15);
      prefix = name + '_';
    } else {
      prefix = prefix + 'boardsset ';
    }

    // IE11 & Edge
    if (navigator.msSaveBlob) {
      navigator.msSaveBlob(
        jsonData,
        prefix + EXPORT_CONFIG_BY_TYPE.cboard.filename,
      );
    } else {
      // In FF link must be added to DOM to be clicked
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(jsonData);
      link.setAttribute(
        'download',
        prefix + EXPORT_CONFIG_BY_TYPE.cboard.filename,
      );
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
}
