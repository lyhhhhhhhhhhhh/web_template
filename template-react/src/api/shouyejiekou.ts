// @ts-ignore
/* eslint-disable */
import { api } from '../utils/api';

/** 
 * 首页数据获取 
 * GET /api/ 
 */
export async function indexUsingGet(options?: { [key: string]: any }) {
  return api.get<API.BaseResponseString_>("/", {
    ...(options || {}),
  });
}
