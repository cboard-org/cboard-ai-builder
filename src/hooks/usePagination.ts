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
    totalItems: number;
    actualPage: number;
    itemsPerPage: number;
  },
  fetchItems: FetchPaginateData<DataItemType>,
) {
  const { totalItems, actualPage, itemsPerPage } = pagination;
  const [page, setPage] = useState(actualPage);

  const [fetchingMoreItems, setFetchingMoreItems] = useState(false);
  const [items, setItems] = useState<(DataItemType | null)[]>(
    new Array(totalItems).fill(null).map((_, idx) => list[idx] || null),
  );

  const handleChange = (
    event: React.ChangeEvent<unknown>,
    actualPage: number,
  ) => {
    setPage(actualPage);
    const actualItemIndex = (actualPage - 1) * itemsPerPage;
    if (items[actualItemIndex] === null) {
      setFetchingMoreItems(true);
    }
  };

  useEffect(() => {
    function fillArrayStartingAtIndex(
      arr: (DataItemType | null)[],
      startIdx: number,
      objects: DataItemType[],
    ) {
      for (let i = 0; i < objects.length; i++) {
        arr[startIdx + i] = objects[i];
      }
      return arr;
    }

    if (fetchingMoreItems) {
      const fetchMoreItems = async () => {
        try {
          const { data } = await fetchItems({
            actualPage: page,
            limitPages: 2,
            itemsPerPage: itemsPerPage,
          });

          const actualItemIndex = (page - 1) * itemsPerPage;

          setItems((prevItems) =>
            fillArrayStartingAtIndex([...prevItems], actualItemIndex, data),
          );
          setFetchingMoreItems(false);
        } catch (e) {
          console.error(e);
        }
      };
      fetchMoreItems();
    }
  }, [fetchingMoreItems, fetchItems, page, itemsPerPage]);

  return { handleChange, items };
}
