'use client';

import Stack from '@mui/material/Stack';
import List from '@mui/material/List';
import Pagination from '@mui/material/Pagination';
import DataItem from '@/components/DataItem/DataItem';
import { BaseDataItemType } from '@/components/DataItem/DataItem';
import styles from './styles';
import Skeleton from '@mui/material/Skeleton';
import { useState } from 'react';

const DEFAULT_INITIAL_PAGE = 1;
const DEFAULT_ITEMS_PER_PAGE = 2;

const getTruncatedItems = <DataItemType extends BaseDataItemType>(
  items: (DataItemType | null)[],
  actualPage: number,
  itemsPerPage: number,
) => {
  const start = (actualPage - 1) * itemsPerPage;
  const truncated = items.slice(start, start + itemsPerPage);
  return truncated.includes(null) ? [] : (truncated as DataItemType[]);
};

export default function DataList<DataItemType extends BaseDataItemType>({
  list,
  deleteItem,
  pagination = {
    totalPages: null,
    initialPage: DEFAULT_INITIAL_PAGE,
    itemsPerPage: DEFAULT_ITEMS_PER_PAGE,
  },
  handleChange,
}: {
  list: (DataItemType | null)[];
  deleteItem: (data: DataItemType) => void;
  pagination?: {
    totalPages: number | null;
    initialPage: number;
    itemsPerPage: number;
  };
  handleChange?: (event: React.ChangeEvent<unknown>, value: number) => void;
}) {
  const [actualPage, setActualPage] = useState(pagination.initialPage);

  const onChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setActualPage(value);
    if (handleChange) handleChange(event, value);
  };
  const { totalPages, itemsPerPage } = pagination;
  const truncatedItems = getTruncatedItems(list, actualPage, itemsPerPage);
  return (
    <Stack sx={styles.stack}>
      <List sx={styles.list}>
        {truncatedItems.length ? (
          truncatedItems.map((data, index) => (
            <DataItem data={data} key={index} onDelete={deleteItem} />
          ))
        ) : (
          <>
            <Skeleton sx={{ height: '50px', background: 'red' }} />
            <Skeleton sx={{ height: '50px' }} />
          </>
        )}
      </List>
      <Pagination
        sx={styles.pagination}
        count={totalPages ? totalPages : Math.ceil(list.length / itemsPerPage)}
        color="primary"
        siblingCount={0}
        page={actualPage}
        onChange={onChange}
      />
    </Stack>
  );
}
