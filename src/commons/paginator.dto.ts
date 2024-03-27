import { Injectable } from '@nestjs/common';

@Injectable()
export class Paginator {
  data: any[];
  count: number;
  perPage: number;
  currentPage: number;
  prevPage: number | null;
  nextPage: number | null;
  lastPage: number;

  constructor(data: any[], total: number, filters: any) {
    this.data = data;
    this.count = total;
    this.perPage = filters.limit;
    this.currentPage = filters.page;
    this.prevPage = filters.page - 1 === 0 ? null : filters.page - 1;
    this.nextPage =
      filters.page * filters.limit > total ? null : filters.page + 1;
    this.lastPage = Math.ceil(total / filters.limit);
  }
}
