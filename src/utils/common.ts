export type PaginationResponse = {
  code: number;
  content: string;
  data: {
    content: any[];
    pageNumber: number;
    pageSize: number;
    total: number;
  };
};

export type PaginationResult = {
  data: any[];
  success: boolean;
  pageSize: number;
  current: number;
  total: number;
};

export const defaultPaginationResult = {
  data: [],
  success: true,
  pageSize: 20,
  current: 1,
  total: 0,
};

export const parsePagination = (paginationResponse: PaginationResponse): PaginationResult => {
  const {
    data: { content = [], pageNumber = 1, pageSize = 20, total = 0 },
  } = paginationResponse;
  return {
    data: content,
    success: true,
    pageSize,
    current: pageNumber,
    total,
  };
};
