'use client';

import { useState } from 'react';
import Stack from '@mui/material/Stack';
import List from '@mui/material/List';
import Pagination from '@mui/material/Pagination';
import DataItem from '@/components/DataItem/DataItem';
import { BaseDataItemType } from '@/components/DataItem/DataItem';
import styles from './Styles';

export default function DataList<DataItemType extends BaseDataItemType>({
  list,
  deleteItem,
}: {
  list: DataItemType[];
  deleteItem: (data: DataItemType) => void;
}) {
  const [page, setPage] = useState(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  const itemsPerPage = 2;
  const paginationCount = Math.ceil(list.length / itemsPerPage);
  const start = (page - 1) * itemsPerPage;
  const truncatedItems = list.slice(start, start + itemsPerPage);

  return (
    <Stack sx={styles.stack}>
      <List sx={styles.list}>
        {truncatedItems.map((data, index) => (
          <DataItem data={data} key={index} onDelete={deleteItem} />
        ))}
      </List>
      <Pagination
        sx={styles.pagination}
        count={paginationCount}
        color="primary"
        siblingCount={0}
        page={page}
        onChange={handleChange}
      />
    </Stack>
  );
}
