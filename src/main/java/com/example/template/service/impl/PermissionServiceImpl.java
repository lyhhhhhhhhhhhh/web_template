package com.example.template.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.template.mapper.PermissionMapper;
import com.example.template.model.entity.Permission;
import com.example.template.service.PermissionService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * 权限服务实现
 */
@Service
@Slf4j
public class PermissionServiceImpl extends ServiceImpl<PermissionMapper, Permission> implements PermissionService {

  @Resource
  private PermissionMapper permissionMapper;

  @Override
  public List<String> getPermissionsByRole(String userRole) {
    return permissionMapper.getPermissionCodesByRole(userRole);
  }
}