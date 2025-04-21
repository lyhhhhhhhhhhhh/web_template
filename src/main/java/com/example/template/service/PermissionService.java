package com.example.template.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.example.template.model.entity.Permission;

import java.util.List;

/**
 * 权限服务
 */
public interface PermissionService extends IService<Permission> {

  /**
   * 获取角色的权限列表
   * 
   * @param userRole 用户角色
   * @return 权限列表
   */
  List<String> getPermissionsByRole(String userRole);
}