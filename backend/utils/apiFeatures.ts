import { FilterQuery, Model, Document } from 'mongoose';
export class ApiFeatures<T extends Document> {
  private model: Model<T>;
  private page: number;
  private limit: number;
  private sort: { [key: string]: 'asc' | 'desc' };
  private filter: FilterQuery<T>;

  constructor(model: Model<T>, options: { page?: number; limit?: number; sort?: any; filter?: any } = {}) {
    this.model = model;
    this.page = options.page || 1;
    this.limit = options.limit || 10;
    this.sort = options.sort || {};
    this.filter = options.filter || {};
  }

  async getResults(): Promise<{ results: T[]; currentPage: number; totalPages: number; totalResults: number }> {
    try {
      const query = this.model.find(this.filter);
      const total = await this.model.countDocuments(this.filter);
      const totalPages = Math.ceil(total / this.limit);

      const results = await query
        .sort(this.sort)
        .skip((this.page - 1) * this.limit)
        .limit(this.limit)
        .exec();

      return {
        results,
        currentPage: this.page,
        totalPages,
        totalResults: total,
      };
    } catch (error) {
      throw new Error(`Error fetching results: ${error.message}`);
    }
  }
}
