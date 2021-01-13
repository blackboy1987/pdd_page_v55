import request from '@/utils/request';
import { Constants } from '@/utils/constants';
import {ResponseResult} from "@/utils/common";

export async function query() {
  return request<API.CurrentUser[]>(`${Constants.baseUrl}users`);
}

export async function queryCurrent() {
  return request<API.CurrentUser>(`${Constants.baseUrl}currentUser`);
}

export async function queryNotices(): Promise<any> {
  return request<{ data: API.NoticeIconData[] }>('/api/notices');
}
export async function logout() {
  localStorage.removeItem("token");
  return request<ResponseResult>(`${Constants.baseUrl}logout`,{
    method: 'POST',
  });
}
