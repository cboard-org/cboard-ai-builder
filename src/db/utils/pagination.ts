import { Model, Document, FilterQuery } from 'mongoose';

type QueryType<T extends Document> = FilterQuery<T>;

type PaginationOptions<T extends Document> = {
  query?: QueryType<T>;
  populate?: string[];
  page?: number;
  limit?: number;
};

type PaginatedData<T extends Document> = {
  total: number;
  page: number;
  limit: number;
  data: T[];
};

const paginationResponse = async <T extends Document>(
  model: Model<T>,
  { query = {}, page = 1, limit = 10 }: PaginationOptions<T> = {},
): Promise<PaginatedData<T>> => {
  let total = 0;
  let data: T[] = [];

  const skip = (page - 1) * limit;
  const queryModel = model.find(query).skip(skip).limit(limit);

  try {
    data = await queryModel.exec();
    total = await model.countDocuments(query).exec();
  } catch (e) {
    console.error('Error fetching paginated data:', e);
  }

  return {
    total,
    page,
    limit,
    data,
  };
};

export default paginationResponse;
