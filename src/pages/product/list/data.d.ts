export type PddLog = {
  code: number;
  msg: string;
  storeName: string;
  productName: string;
};

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
  publishStatus: number;
  createdDate: Date;
  createdAt: Date;
  progress: number;
  productCategoryName?: string;
  url?: string;
  pddLogs: PddLog[];
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
export type ProductCategory = {
  id: number;
  name: string;
  children: ProductCategory[];
};

export type Store = {
  createdDate: Date;
  id: number;
  mallId: number;
  mallName: string;
  expired: boolean;
  url: string;
};
export type ProductCategoryTree = {
  id: number;
  name: string;
  children: ProductCategoryTree[];
};

export type CrawlerUrlLogItem = {
  id: number;
  total: number;
  success: number;
  fail: number;
  status: number;
  pluginIds: string[];
  type: number;
  createdDate: Date;
  product: Product;
  pddProductCategoryNames: string[];
};
