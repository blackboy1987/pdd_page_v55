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

export type ResponseResult = {
  code: number;
  type: 'success' | 'error' | 'warn';
  content: string;
  data: any;
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

export const parseFormValues = (formValues: { [key: string]: any }): { [key: string]: string } => {
  let newFormValues = {
    ...formValues,
  };
  if (formValues.rangeDate) {
    newFormValues = {
      ...newFormValues,
      beginDate: newFormValues.rangeDate[0].format('YYYY-MM-DD 00:00:00'),
      endDate: newFormValues.rangeDate[1].format('YYYY-MM-DD 00:00:00'),
    };
    delete newFormValues.rangeDate;
  }
  return newFormValues;
};
