import { BoardRecord } from '@/commonTypes/Board';
import { EXPORT_CONFIG_BY_TYPE } from './constants';
import moment from 'moment';

const getDatetimePrefix = () => moment().format('YYYY-MM-DD_HH-mm-ss-');

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
    const prefix = getDatetimePrefix();
    let name: string | undefined = prefix;
    if (boards.length === 1) {
      name = name + boards[0].name?.replace(' ', '-').substring(0, 20) + ' ';
    } else {
      name = name + 'boardsset ';
    }

    // IE11 & Edge
    if (navigator.msSaveBlob) {
      navigator.msSaveBlob(
        jsonData,
        name + EXPORT_CONFIG_BY_TYPE.cboard.filename,
      );
    } else {
      // In FF link must be added to DOM to be clicked
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(jsonData);
      link.setAttribute(
        'download',
        name + EXPORT_CONFIG_BY_TYPE.cboard.filename,
      );
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
}
