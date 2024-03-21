import { useState, useEffect } from 'react';

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

export default function usePagination<DataItemType>(
  list: DataItemType[],
  pagination: {
    totalPages: number;
    actualPage: number;
    itemsPerPage: number;
    totalRetrievedPages: number;
  },
  fetchItems: FetchPaginateData<DataItemType>,
) {
  const { totalPages, actualPage, itemsPerPage } = pagination;
  const [page, setPage] = useState(actualPage);
  const [fetchingMoreItems, setFetchingMoreItems] = useState(false);
  const [items, setItems] = useState(list);

  function fillArrayStartingAtIndex(
    arr: DataItemType[],
    startIdx: number,
    objects: DataItemType[],
  ) {
    for (let i = 0; i < objects.length; i++) {
      arr[startIdx + i] = objects[i];
    }
    return arr;
  }

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    if (items[(value - 1) * itemsPerPage] === undefined) {
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
            itemsPerPage: itemsPerPage,
          });
          // await new Promise((resolve) => setTimeout(resolve, 2000));
          const array = [...items];
          fillArrayStartingAtIndex(array, (page - 1) * itemsPerPage, data);
          setItems((prevItems) =>
            fillArrayStartingAtIndex(
              [...prevItems],
              (page - 1) * itemsPerPage,
              data,
            ),
          );
          console.log('fetchMoreItems', data);
          setFetchingMoreItems(false);
        } catch (e) {
          console.error(e);
        }
      };
      fetchMoreItems();
    }
  }, [fetchingMoreItems, pagination]);

  const paginationCount = pagination.totalPages
    ? totalPages
    : Math.ceil(pagination.totalPages / itemsPerPage);

  return { handleChange, paginationCount, items };
}
