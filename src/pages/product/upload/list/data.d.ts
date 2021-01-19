export type TableListItem = {
  id: number;
  disabled?: boolean;
  href: string;
  avatar: string;
  name: string;
  owner: string;
  desc: string;
  callNo: number;
  status: number;
  createdDate: Date;
  createdAt: Date;
  progress: number;
  productCategoryName?: string;
  url?: string;
};

export type TableListPagination = {
  total: number;
  pageSize: number;
  current: number;
};

export type TableListData = {
  list: TableListItem[];
  pagination: Partial<TableListPagination>;
};

export type TableListParams = {
  status?: string;
  name?: string;
  desc?: string;
  key?: number;
  pageSize?: number;
  currentPage?: number;
  filter?: Record<string, any[]>;
  sorter?: Record<string, any>;
};

export type Store = {
  createdDate: Date;
  id: number;
  mallId: number;
  mallName: string;
  expired: boolean;
  url: string;
};

export type StoreTree = {
  title: string;
  key: string;
  children: StoreTree[];
};
