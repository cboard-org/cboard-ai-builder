'use client';

import { useEffect, useState } from 'react';
import Stack from '@mui/material/Stack';
import List from '@mui/material/List';
import Pagination from '@mui/material/Pagination';
import DataItem from '@/components/DataItem/DataItem';
import { BaseDataItemType } from '@/components/DataItem/DataItem';
import styles from './styles';
import Skeleton from '@mui/material/Skeleton';

type FetchPaginateData<DataItemType> = (params: {
  actualPage: number;
  limitPages: number;
  itemsPerPage: number;
}) => Promise<{
  data: DataItemType[];
  pagination: {
    totalPages: number;
    actualPage: number;
    itemsPerPage: number;
    totalRetrievedPages: number;
  };
}>;

const ITEMS_PER_PAGE = 2;
//let flag = true;
function usePagination<DataItemType>(
  list: DataItemType[],
  pagination: {
    totalPages: number;
    actualPage: number;
    itemsPerPage: number;
    totalRetrievedPages: number;
  },
  fetchItems: FetchPaginateData<DataItemType>,
) {
  const { totalPages, actualPage } = pagination;
  const [page, setPage] = useState(actualPage);
  const [fetchingMoreItems, setFetchingMoreItems] = useState(false);
  //const [items, setItems] = useState(getInitialItemsArray());
  const [items, setItems] = useState(list);

  // function getInitialItemsArray() {
  //   const initialItemsArray = new Array(totalPages * ITEMS_PER_PAGE).fill(null);
  //   fillArrayStartingAtIndex(initialItemsArray, 0, list);
  //   return initialItemsArray;
  // }

  function fillArrayStartingAtIndex(
    arr: DataItemType[],
    startIdx: number,
    objects: DataItemType[],
  ) {
    for (let i = 0; i < objects.length; i++) {
      arr[startIdx + i] = objects[i];
    }
  }

  // console.log('items', items);
  // useEffect(() => {
  //   if (flag) return;
  //   const arr = new Array(totalPages * ITEMS_PER_PAGE).fill({});
  //   console.log(list);

  //   fillArrayStartingAtIndex(arr, 0, list);
  //   console.log('arr', arr);
  //   setItems(arr);
  //   flag = false;
  // }, [list, totalPages]);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    if (items[(value - 1) * ITEMS_PER_PAGE] === undefined) {
      setFetchingMoreItems(true);
    }
  };

  useEffect(() => {
    if (fetchingMoreItems) {
      const fetchMoreItems = async () => {
        try {
          const { data } = await fetchItems({
            actualPage: page,
            limitPages: 2,
            itemsPerPage: ITEMS_PER_PAGE,
          });
          await new Promise((resolve) => setTimeout(resolve, 2000));
          const array = [...items];
          fillArrayStartingAtIndex(array, (page - 1) * ITEMS_PER_PAGE, data);
          setItems(array);
          console.log('fetchMoreItems', data);
          setFetchingMoreItems(false);
        } catch (e) {
          console.error(e);
        }
      };
      fetchMoreItems();
    }
  }, [fetchingMoreItems, page, pagination]);

  const paginationCount = pagination.totalPages
    ? totalPages
    : Math.ceil(pagination.totalPages / ITEMS_PER_PAGE);
  return { page, handleChange, paginationCount, items };
}

export default function DataList<DataItemType extends BaseDataItemType>({
  list,
  deleteItem,
  pagination = {
    totalPages: 3,
    actualPage: 1,
    itemsPerPage: 2,
    totalRetrievedPages: 3,
  },
  fetchItems,
}: {
  list: DataItemType[];
  deleteItem: (data: DataItemType) => void;
  pagination: {
    totalPages: number;
    actualPage: number;
    itemsPerPage: number;
    totalRetrievedPages: number;
  };
  fetchItems: FetchPaginateData<DataItemType>;
}) {
  const { page, handleChange, paginationCount, items } =
    usePagination<DataItemType>(list, pagination, fetchItems);
  // const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
  //   setPage(value);
  // };
  // const paginationCount = Math.ceil(list.length / ITEMS_PER_PAGE);

  const start = (page - 1) * ITEMS_PER_PAGE;
  const truncatedItems = items.slice(start, start + ITEMS_PER_PAGE);
  // console.log(truncatedItems, 'truncatedItems');
  return (
    <Stack sx={styles.stack}>
      <List sx={styles.list}>
        {truncatedItems.length ? (
          truncatedItems.map((data, index) => (
            <DataItem data={data} key={index} onDelete={deleteItem} />
          ))
        ) : (
          <>
            <Skeleton sx={{ height: '50%', background: 'red' }} />
            <Skeleton sx={{ height: '50%' }} />
          </>
        )}
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
