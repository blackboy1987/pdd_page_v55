import request from '@/utils/request';
import {PaginationResponse, parsePagination} from "@/utils/common";
import {Constants} from "@/utils/constants";

export async function list(params?: {[key: string]: any}) {
  return request<PaginationResponse>(`${Constants.baseUrl}crawler_product/list`, {
    method: 'POST',
    data: params,
  }).then(response=>parsePagination(response));
}
