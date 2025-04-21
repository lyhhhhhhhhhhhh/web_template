package com.example.template.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.template.mapper.UserRoleMapper;
import com.example.template.model.entity.UserRole;
import com.example.template.service.UserRoleService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

/**
 * 用户角色服务实现
 */
@Service
@Slf4j
public class UserRoleServiceImpl extends ServiceImpl<UserRoleMapper, UserRole> implements UserRoleService {

  @Override
  public UserRole getRoleByRoleCode(String roleCode) {
    if (roleCode == null) {
      return null;
    }
    QueryWrapper<UserRole> queryWrapper = new QueryWrapper<>();
    queryWrapper.eq("roleCode", roleCode);
    return this.getOne(queryWrapper);
  }
}