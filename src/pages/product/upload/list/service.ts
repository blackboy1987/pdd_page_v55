import request from '@/utils/request';
import { PaginationResponse, parsePagination } from '@/utils/common';
import { Constants } from '@/utils/constants';
import { StoreTree } from '@/pages/product/upload/list/data';

export async function list(params?: { [key: string]: any }) {
  return request<PaginationResponse>(`${Constants.baseUrl}product/list1`, {
    method: 'POST',
    data: params,
  }).then((response) => parsePagination(response));
}

export async function listStoreTree(params?: { [key: string]: any }) {
  return request<StoreTree[]>(`${Constants.baseUrl}store/tree`, {
    method: 'POST',
    data: params,
  });
}
