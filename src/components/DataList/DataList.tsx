'use client';

import { useState } from 'react';
import Stack from '@mui/material/Stack';
import List from '@mui/material/List';
import Pagination from '@mui/material/Pagination';
import DataItem from '@/components/DataItem/DataItem';
import { BaseDataItemType } from '@/components/DataItem/DataItem';
import styles from './styles';
import { usePathname, useRouter } from '@/navigation';
import { useSearchParams } from 'next/navigation';

const ITEMS_PER_PAGE = 2;

export default function DataList<DataItemType extends BaseDataItemType>({
  list,
  deleteItem,
}: {
  list: DataItemType[];
  deleteItem: {
    deleteData: (data: DataItemType) => void;
    isDeleting: boolean;
  };
}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [page, setPage] = useState(parseInt(searchParams.get('page') ?? '1'));
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set('page', value.toString());
    router.replace(`${pathname}?${newParams.toString()}`);
  };
  const paginationCount = Math.ceil(list.length / ITEMS_PER_PAGE);
  const start = (page - 1) * ITEMS_PER_PAGE;
  const truncatedItems = list.slice(start, start + ITEMS_PER_PAGE);

  return (
    <Stack sx={styles.stack}>
      <List sx={styles.list}>
        {truncatedItems.map((data, index) => (
          <DataItem data={data} key={index} deleteItem={deleteItem} />
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
