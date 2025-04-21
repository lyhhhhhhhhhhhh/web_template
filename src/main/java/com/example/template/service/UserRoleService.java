package com.example.template.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.example.template.model.entity.UserRole;

/**
 * 用户角色服务
 */
public interface UserRoleService extends IService<UserRole> {

  /**
   * 根据角色代码获取角色
   * 
   * @param roleCode 角色代码
   * @return 角色信息
   */
  UserRole getRoleByRoleCode(String roleCode);
}