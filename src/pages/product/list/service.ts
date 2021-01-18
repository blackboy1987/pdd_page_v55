import request from '@/utils/request';
import { PaginationResponse, parsePagination, ResponseResult } from '@/utils/common';
import { Constants } from '@/utils/constants';

export async function list(params?: { [key: string]: any }) {
  return request<PaginationResponse>(`${Constants.baseUrl}product/list`, {
    method: 'POST',
    data: params,
  }).then((response) => parsePagination(response));
}

export async function changeTitle(params?: { [key: string]: any }) {
  return request<ResponseResult>(`${Constants.baseUrl}product/changeTitle`, {
    method: 'POST',
    data: params,
  });
}

export async function remove(params?: { [key: string]: any }) {
  return request<ResponseResult>(`${Constants.baseUrl}product/delete`, {
    method: 'POST',
    data: params,
  });
}


export async function queryDetail(params?: { [key: string]: any }) {
  return request<ResponseResult>(`${Constants.baseUrl}product/detail`, {
    method: 'POST',
    data: params,
  });
}
