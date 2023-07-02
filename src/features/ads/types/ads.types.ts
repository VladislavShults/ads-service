type Pagination = {
  pagesCount: number;
  page: number;
  pageSize: number;
  totalCount: number;
};

export type AdsViewModel = {
  title: string;
  mainPhoto: string;
  price: string;
};

export type AdsWithPaginationType = Pagination & { items: AdsViewModel[] };
