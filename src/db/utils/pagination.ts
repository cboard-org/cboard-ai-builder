import { Model, FilterQuery, HydratedDocument, SortOrder } from 'mongoose';

interface PaginationOptions<Item> {
  query?: FilterQuery<Item>;
  sort?: Record<string, SortOrder> | string;
  actualPage?: number;
  limitPages?: number;
  itemsPerPage?: number;
}

interface PaginatedData<Item> {
  totalItems: number;
  totalPages: number;
  actualPage: number;
  totalRetrievedPages: number;
  data: HydratedDocument<Item>[];
}

const paginationResponse = async <Item>(
  model: Model<Item>,
  {
    query = {},
    sort = { _id: 'desc' },
    actualPage = 1,
    limitPages = 4,
    itemsPerPage = 2,
  }: PaginationOptions<Item> = {},
): Promise<PaginatedData<Item>> => {
  let totalItems = 0;
  let data: HydratedDocument<Item>[] = [];

  const limit = itemsPerPage * limitPages;
  const skip = (actualPage - 1) * itemsPerPage;
  console.log(
    'query',
    query,
    'actualPage',
    actualPage,
    'limit',
    limit,
    'skip',
    skip,
  );

  const queryModel = model.find(query).sort(sort).skip(skip).limit(limit);

  try {
    data = await queryModel.exec();
    totalItems = await model.countDocuments(query).exec();
  } catch (e) {
    throw new Error('Error fetching paginated data: ' + e);
  }
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const totalRetrievedPages = Math.ceil(data.length / itemsPerPage);

  return {
    totalItems,
    totalPages,
    actualPage,
    totalRetrievedPages,
    data,
  };
};

export default paginationResponse;
