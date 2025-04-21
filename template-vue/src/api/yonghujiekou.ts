// @ts-ignore
/* eslint-disable */
import request from "@/utils/request";

/** 创建用户 创建用户（需要admin-user-add权限） POST /user/add */
export async function addUserUsingPost(
  body: API.UserRegisterRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseLong_>("/user/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取当前登录用户 获取当前登录用户 GET /user/current */
export async function getCurrentUserUsingGet(options?: { [key: string]: any }) {
  return request<API.BaseResponseUserVO_>("/user/current", {
    method: "GET",
    ...(options || {}),
  });
}

/** 删除用户 删除用户（需要admin-user-delete权限） DELETE /user/delete/${param0} */
export async function deleteUserUsingDelete(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteUserUsingDELETEParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BaseResponseBoolean_>(`/user/delete/${param0}`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 根据id获取用户 根据id获取用户（需要admin-user-select权限） GET /user/get/${param0} */
export async function getUserByIdUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserByIdUsingGETParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BaseResponseUserVO_>(`/user/get/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 获取用户列表 获取用户列表（需要admin-user-select权限） GET /user/list */
export async function listUserUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listUserUsingGETParams,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponsePageUserVO_>("/user/list", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 用户登录 用户登录 POST /user/login */
export async function userLoginUsingPost(
  body: API.UserLoginRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseUserVO_>("/user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 用户注销 用户注销 POST /user/logout */
export async function userLogoutUsingPost(options?: { [key: string]: any }) {
  return request<API.BaseResponseBoolean_>("/user/logout", {
    method: "POST",
    ...(options || {}),
  });
}

/** 用户注册 用户注册 POST /user/register */
export async function userRegisterUsingPost(
  body: API.UserRegisterRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseLong_>("/user/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 更新用户 更新用户（需要admin-user-update权限或user-update权限） PUT /user/update */
export async function updateUserUsingPut(
  body: API.UserUpdateRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseBoolean_>("/user/update", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}
