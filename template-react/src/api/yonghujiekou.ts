// @ts-ignore
/* eslint-disable */
import { api } from '../utils/api';

/** 创建用户 创建用户（需要admin-user-add权限） POST /api/user/add */
export async function addUserUsingPost(
  body: API.UserRegisterRequest,
  options?: { [key: string]: any }
) {
  return api.post<API.BaseResponseLong_>("/user/add", body, {
    ...(options || {}),
  });
}

/** 获取当前登录用户 获取当前登录用户 GET /api/user/current */
export async function getCurrentUserUsingGet(options?: { [key: string]: any }) {
  return api.get<API.BaseResponseUserVO_>("/user/current", {
    ...(options || {}),
  });
}

/** 删除用户 删除用户（需要admin-user-delete权限） DELETE /api/user/delete/${id} */
export async function deleteUserUsingDelete(
  params: API.deleteUserUsingDELETEParams,
  options?: { [key: string]: any }
) {
  const { id } = params;
  return api.delete<API.BaseResponseBoolean_>(`/user/delete/${id}`, {
    ...(options || {}),
  });
}

/** 根据id获取用户 根据id获取用户（需要admin-user-select权限） GET /api/user/get/${id} */
export async function getUserByIdUsingGet(
  params: API.getUserByIdUsingGETParams,
  options?: { [key: string]: any }
) {
  const { id } = params;
  return api.get<API.BaseResponseUserVO_>(`/user/get/${id}`, {
    ...(options || {}),
  });
}

/** 获取用户列表 获取用户列表（需要admin-user-select权限） GET /api/user/list */
export async function listUserUsingGet(
  params: API.listUserUsingGETParams,
  options?: { [key: string]: any }
) {
  return api.get<API.BaseResponsePageUserVO_>("/user/list", {
    params,
    ...(options || {}),
  });
}

/** 用户登录 用户登录 POST /api/user/login */
export async function userLoginUsingPost(
  body: API.UserLoginRequest,
  options?: { [key: string]: any }
) {
  return api.post<API.BaseResponseUserVO_>("/user/login", body, {
    ...(options || {}),
  });
}

/** 用户注销 用户注销 POST /api/user/logout */
export async function userLogoutUsingPost(options?: { [key: string]: any }) {
  return api.post<API.BaseResponseBoolean_>("/user/logout", null, {
    ...(options || {}),
  });
}

/** 用户注册 用户注册 POST /api/user/register */
export async function userRegisterUsingPost(
  body: API.UserRegisterRequest,
  options?: { [key: string]: any }
) {
  return api.post<API.BaseResponseLong_>("/user/register", body, {
    ...(options || {}),
  });
}

/** 更新用户 更新用户（需要admin-user-update权限或user-update权限） PUT /api/user/update */
export async function updateUserUsingPut(
  body: API.UserUpdateRequest,
  options?: { [key: string]: any }
) {
  return api.put<API.BaseResponseBoolean_>("/user/update", body, {
    ...(options || {}),
  });
}
