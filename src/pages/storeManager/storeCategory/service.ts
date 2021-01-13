import request  from '@/utils/request';
import type {TableListItem, TableListParams} from './data.d';
import {Constants} from "@/utils/constants";
import {PaginationResponse, parsePagination, ResponseResult} from "@/utils/common";

export async function list(params?: TableListParams) {
  return request(`${Constants.baseUrl}store_category/list`, {
    method: 'POST',
    data: params,
  }).then((response: PaginationResponse)=>{
    return parsePagination(response);
  });
}
export async function save(params: {[key: string]: any}) {
  return request<ResponseResult>(`${Constants.baseUrl}store_category/save`, {
    method: 'POST',
    data: params,
  });
}
export async function update(params?: TableListItem) {
  return request(`${Constants.baseUrl}store_category/update`, {
    method: 'POST',
    data: params,
  });
}
export async function remove(params?: TableListParams) {
  return request(`${Constants.baseUrl}store_category/delete`, {
    method: 'POST',
    data: params,
  });
}
