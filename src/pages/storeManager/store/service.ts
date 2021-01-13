import request  from '@/utils/request';
import type {TableListParams} from './data.d';
import {Constants} from "@/utils/constants";
import {PaginationResponse, parsePagination, ResponseResult} from "@/utils/common";

export async function list(params?: TableListParams) {
  return request(`${Constants.baseUrl}store/list`, {
    method: 'POST',
    data: params,
  }).then((response: PaginationResponse)=>{
    return parsePagination(response);
  });
}

/**
 * 店铺解绑
 * @param params
 */
export async function unbind(params: number) {
  return request<ResponseResult>(`${Constants.baseUrl}store/unbind`, {
    method: 'POST',
    data: params,
  });
}
