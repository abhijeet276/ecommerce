import { FilterQuery, Model, Document } from 'mongoose';
import { FilterSearchOptions, PaginationOptions } from '../interface/IPagination';

export class ApiFeatures<T extends Document> {
  private model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }
  async filterSearchPaginate({
    filters,
    searchKeys,
  }: FilterSearchOptions, { page, limit }: PaginationOptions): Promise<{
    data: T[];
    totalItems: number;
    totalPages: number;
  }> {
    const orQueries = searchKeys.map(key => ({ [key]: new RegExp(filters[key], 'i') }));
    const query: FilterQuery<Document> = {
      $or: orQueries,
    };
    console.log(query,orQueries,"orQueries")
    const totalItems = await this.model.countDocuments(query);
    const totalPages = Math.ceil(totalItems / limit);
    const data = await this.model
      .find(query)
      .limit(limit)
      .skip((page - 1) * limit)
      .exec();
    return {
      data,
      totalItems,
      totalPages,
    };
  }
}
