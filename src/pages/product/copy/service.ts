import request from '@/utils/request';
import { Constants } from '@/utils/constants';

export async function crawler(params: { urls: string; type: number }) {
  return request(`${Constants.baseUrl}crawler`, {
    method: 'POST',
    data: params,
  });
}
