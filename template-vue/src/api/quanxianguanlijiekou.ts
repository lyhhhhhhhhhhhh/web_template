// @ts-ignore
/* eslint-disable */
import request from "@/utils/request";

/** 添加权限 添加权限 POST /permission/add */
export async function addPermissionUsingPost(
  body: API.Permission,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseBoolean_>("/permission/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除权限 删除权限 DELETE /permission/delete/${param0} */
export async function deletePermissionUsingDelete(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deletePermissionUsingDELETEParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BaseResponseBoolean_>(`/permission/delete/${param0}`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 获取所有权限 获取所有权限 GET /permission/list */
export async function getAllPermissionsUsingGet(options?: {
  [key: string]: any;
}) {
  return request<API.BaseResponseListPermission_>("/permission/list", {
    method: "GET",
    ...(options || {}),
  });
}

/** 获取指定角色的权限列表 获取指定角色的权限列表 GET /permission/list/${param0} */
export async function getPermissionsByRoleUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getPermissionsByRoleUsingGETParams,
  options?: { [key: string]: any }
) {
  const { userRole: param0, ...queryParams } = params;
  return request<API.BaseResponseListString_>(
    `/permission/list/${param0}`,
    {
      method: "GET",
      params: { ...queryParams },
      ...(options || {}),
    }
  );
}

/** 更新权限 更新权限 PUT /permission/update */
export async function updatePermissionUsingPut(
  body: API.Permission,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseBoolean_>("/permission/update", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}
