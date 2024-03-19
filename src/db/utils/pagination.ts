import { Model, FilterQuery } from 'mongoose';

interface PaginationOptions<Item> {
  query?: FilterQuery<Item>;
  actualPage?: number;
  limit?: number;
  itemsPerPage?: number;
}

interface PaginatedData<Item> {
  totalItems: number;
  totalPages: number;
  actualPage: number;
  limit: number;
  data: Item[];
}

const paginationResponse = async <Item>(
  model: Model<Item>,
  {
    query = {},
    actualPage = 1,
    limit = 10,
    itemsPerPage = 2,
  }: PaginationOptions<Item> = {},
): Promise<PaginatedData<Item>> => {
  let totalItems = 0;
  let data: Item[] = [];

  const skip = (actualPage - 1) * limit;
  const queryModel = model.find(query).skip(skip).limit(limit);

  try {
    data = await queryModel.exec();
    totalItems = await model.countDocuments(query).exec();
  } catch (e) {
    console.error('Error fetching paginated data:', e);
  }
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return {
    totalItems,
    totalPages,
    actualPage,
    limit,
    data,
  };
};

export default paginationResponse;
