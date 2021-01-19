import request from '@/utils/request';
import { PaginationResponse, parsePagination, ResponseResult } from '@/utils/common';
import { Constants } from '@/utils/constants';
import { ProductCategoryTree } from '@/pages/product/list/data';
import { StoreTree } from '@/pages/product/upload/list/data';

export async function list(params?: { [key: string]: any }) {
  return request<PaginationResponse>(`${Constants.baseUrl}es/product/list`, {
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
export async function crawler(params: { id: number }) {
  return request(`${Constants.baseUrl}product/crawler`, {
    method: 'POST',
    data: params,
  });
}
export async function category(params?: { [key: string]: any }) {
  return request<ProductCategoryTree>(`${Constants.baseUrl}product_category/tree`, {
    method: 'POST',
    data: params,
  });
}
export async function updateProductCategory(params?: { [key: string]: any }) {
  return request<ResponseResult>(`${Constants.baseUrl}product/updateProductCategory`, {
    method: 'POST',
    data: params,
  });
}
export async function publish(params?: { [key: string]: any }) {
  return request<ResponseResult>(`${Constants.baseUrl}product/publish`, {
    method: 'POST',
    data: params,
  });
}

export async function listStoreTree(params?: { [key: string]: any }) {
  return request<StoreTree[]>(`${Constants.baseUrl}store/tree`, {
    method: 'POST',
    data: params,
  });
}
