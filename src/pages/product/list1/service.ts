import request from '@/utils/request';
import { PaginationResponse, parsePagination, ResponseResult } from '@/utils/common';
import { Constants } from '@/utils/constants';

export async function list(params?: { [key: string]: any }) {
  return request<PaginationResponse>(`${Constants.baseUrl}product/list1`, {
    method: 'POST',
    data: params,
  }).then((response) => parsePagination(response));
}

export async function reset(params?: { [key: string]: any }) {
  return request<ResponseResult>(`${Constants.baseUrl}product/reset`, {
    method: 'POST',
    data: params,
  });
}
