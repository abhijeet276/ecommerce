import { Document, FilterQuery } from "mongoose";

export interface PaginationOptions {
  page: number;
  limit: number;
}

export interface FilterSearchOptions {
  filters: FilterQuery<Document>;
  searchKeys: string[];
}