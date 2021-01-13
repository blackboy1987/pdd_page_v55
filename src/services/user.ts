import request from '@/utils/request';
import { Constants } from '@/utils/constants';

export async function query() {
  return request<API.CurrentUser[]>(`${Constants.baseUrl}users`);
}

export async function queryCurrent() {
  return request<API.CurrentUser>(`${Constants.baseUrl}currentUser`);
}

export async function queryNotices(): Promise<any> {
  return request<{ data: API.NoticeIconData[] }>('/api/notices');
}
