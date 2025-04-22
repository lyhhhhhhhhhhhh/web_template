// @ts-ignore
/* eslint-disable */
import { api } from '../utils/api';

/** 添加权限 添加权限 POST /api/permission/add */
export async function addPermissionUsingPost(
  body: API.Permission,
  options?: { [key: string]: any }
) {
  return api.post<API.BaseResponseBoolean_>("/permission/add", body, {
    ...(options || {}),
  });
}

/** 删除权限 删除权限 DELETE /api/permission/delete/${id} */
export async function deletePermissionUsingDelete(
  params: API.deletePermissionUsingDELETEParams,
  options?: { [key: string]: any }
) {
  const { id } = params;
  return api.delete<API.BaseResponseBoolean_>(`/permission/delete/${id}`, {
    ...(options || {}),
  });
}

/** 获取所有权限 获取所有权限 GET /api/permission/list */
export async function getAllPermissionsUsingGet(options?: {
  [key: string]: any;
}) {
  return api.get<API.BaseResponseListPermission_>("/permission/list", {
    ...(options || {}),
  });
}

/** 获取指定角色的权限列表 获取指定角色的权限列表 GET /api/permission/list/${userRole} */
export async function getPermissionsByRoleUsingGet(
  params: API.getPermissionsByRoleUsingGETParams,
  options?: { [key: string]: any }
) {
  const { userRole } = params;
  return api.get<API.BaseResponseListString_>(`/permission/list/${userRole}`, {
    ...(options || {}),
  });
}

/** 更新权限 更新权限 PUT /api/permission/update */
export async function updatePermissionUsingPut(
  body: API.Permission,
  options?: { [key: string]: any }
) {
  return api.put<API.BaseResponseBoolean_>("/permission/update", body, {
    ...(options || {}),
  });
}
