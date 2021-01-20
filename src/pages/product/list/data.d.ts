import ex from "umi/dist";

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

export type CrawlerProductImage = {
  id: number;
  images: string[];
}

export type Entry = {
  name: string;
  value: string;
  image: string;
}

export type ParameterValue = {
  group: string;
  entries: Entry[];
}

export type CrawlerProductParameterValue = {
  id: number;
  parameterValues: ParameterValue[];
}

export type SpecificationValue = {
  id: string;
  name: string;
  value: string;
}

export type Sku = {
  sn: string;
  stock: number;
  price: number;
  specificationValues: SpecificationValue[];
}

export type CrawlerProductSku = {
  id: number;
  skus: Sku[];
}

export type CrawlerSpecification = {
  name: string;
  options: string[];
  entries: Entity[];
}

export type CrawlerProductSpecification = {
  id: number;
  crawlerSpecifications: CrawlerSpecification[];
}

export type CrawlerProductStore ={
  url: string;
  name: string;
}

export type ProductDetail = {
  id: string;
  sn: string;
  name: string;
  price: string;
  stock: number;
  crawlerProductImage: CrawlerProductImage;
  crawlerProductIntroductionImage: CrawlerProductImage;
  crawlerProductParameterValue: CrawlerProductParameterValue;
  crawlerProductSku: CrawlerProductSku;
  crawlerProductSpecification: CrawlerProductSpecification;
  crawlerProductStore: CrawlerProductStore;
}
