'use client';

import { useState } from 'react';
import Stack from '@mui/material/Stack';
import List from '@mui/material/List';
import Pagination from '@mui/material/Pagination';
import { useOptimistic } from 'react';
import DataItem from '@/components/DataItem/DataItem';
import { removeHistoryData } from './actions';
import { HistoryData } from './actions';

const sxStyles = {
  stack: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  list: { width: '100%' },
  pagination: { paddingBottom: 1 },
};

export default function HistoryList({
  initialHistories,
}: {
  initialHistories: HistoryData[];
}) {
  const [histories, deleteHistory] = useOptimistic(
    initialHistories,
    (histories, historyToDelete: HistoryData) => {
      return histories.filter((h) => h.id != historyToDelete.id);
    },
  );
  const deleteHistoryData = async (historyToDelete: HistoryData) => {
    deleteHistory(historyToDelete);
    await removeHistoryData(historyToDelete);
  };

  const [page, setPage] = useState(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  const itemsPerPage = 2;
  const paginationCount = Math.ceil(histories.length / itemsPerPage);
  const start = (page - 1) * itemsPerPage;
  const truncatedItems = histories.slice(start, start + itemsPerPage);

  return (
    <Stack sx={sxStyles.stack}>
      <List sx={sxStyles.list}>
        {truncatedItems.map((data, index) => (
          <DataItem data={data} key={index} onDelete={deleteHistoryData} />
        ))}
      </List>
      <Pagination
        sx={sxStyles.pagination}
        count={paginationCount}
        color="primary"
        siblingCount={0}
        page={page}
        onChange={handleChange}
      />
    </Stack>
  );
}
