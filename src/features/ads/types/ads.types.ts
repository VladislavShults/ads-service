import { AdEntity } from '../entities/ads.entity';

type Pagination = {
  pagesCount: number;
  page: number;
  pageSize: number;
  totalCount: number;
};

export type AdsWithPaginationType = Pagination & { items: AdEntity[] };
