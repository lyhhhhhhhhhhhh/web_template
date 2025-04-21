package com.example.template.config;

import cn.dev33.satoken.stp.StpInterface;
import com.example.template.mapper.UserMapper;
import com.example.template.model.entity.User;
import com.example.template.service.PermissionService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * 自定义权限验证接口扩展
 */
@Component
@Slf4j
public class StpInterfaceImpl implements StpInterface {

  @Resource
  private UserMapper userMapper;

  @Resource
  private PermissionService permissionService;

  @Override
  public List<String> getPermissionList(Object loginId, String loginType) {
    // 获取当前登录用户ID
    Long userId = Long.parseLong(loginId.toString());

    // 查询用户信息
    User user = userMapper.selectById(userId);
    if (user == null) {
      return Collections.emptyList();
    }

    // 获取用户角色对应的所有权限
    String userRole = user.getUserRole();
    return permissionService.getPermissionsByRole(userRole);
  }

  @Override
  public List<String> getRoleList(Object loginId, String loginType) {
    // 获取当前登录用户ID
    Long userId = Long.parseLong(loginId.toString());

    // 查询用户信息
    User user = userMapper.selectById(userId);
    if (user == null) {
      return Collections.emptyList();
    }

    // 返回用户角色列表
    List<String> roleList = new ArrayList<>();
    roleList.add(user.getUserRole());
    return roleList;
  }
}