// @ts-ignore
/* eslint-disable */
import request from "@/utils/request";

/** 首页 首页 GET /api/ */
export async function indexUsingGet(options?: { [key: string]: any }) {
  return request<API.BaseResponseString_>("/api/", {
    method: "GET",
    ...(options || {}),
  });
}
