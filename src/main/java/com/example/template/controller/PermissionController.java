package com.example.template.controller;

import cn.dev33.satoken.annotation.SaCheckPermission;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.example.template.common.BaseResponse;
import com.example.template.common.ErrorCode;
import com.example.template.common.ResultUtils;
import com.example.template.exception.BusinessException;
import com.example.template.model.entity.Permission;
import com.example.template.service.PermissionService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;

/**
 * 权限管理接口
 */
@RestController
@RequestMapping("/permission")
@Api(tags = "权限管理接口")
@Slf4j
public class PermissionController {

  @Resource
  private PermissionService permissionService;

  /**
   * 获取指定角色的权限列表
   *
   * @param userRole 用户角色
   * @return 权限列表
   */
  @GetMapping("/list/{userRole}")
  @ApiOperation(value = "获取指定角色的权限列表", notes = "获取指定角色的权限列表")
  @SaCheckPermission("admin-user-select")
  public BaseResponse<List<String>> getPermissionsByRole(@PathVariable String userRole) {
    if (userRole == null) {
      throw new BusinessException(ErrorCode.PARAMS_ERROR);
    }
    List<String> permissionList = permissionService.getPermissionsByRole(userRole);
    return ResultUtils.success(permissionList);
  }

  /**
   * 获取所有权限
   *
   * @return 权限列表
   */
  @GetMapping("/list")
  @ApiOperation(value = "获取所有权限", notes = "获取所有权限")
  @SaCheckPermission("admin-user-select")
  public BaseResponse<List<Permission>> getAllPermissions() {
    List<Permission> permissionList = permissionService.list();
    return ResultUtils.success(permissionList);
  }

  /**
   * 添加权限
   *
   * @param permission 权限信息
   * @return 是否成功
   */
  @PostMapping("/add")
  @ApiOperation(value = "添加权限", notes = "添加权限")
  @SaCheckPermission("admin-user-add")
  public BaseResponse<Boolean> addPermission(@RequestBody Permission permission) {
    if (permission == null || permission.getUserRole() == null || permission.getPermissionCode() == null) {
      throw new BusinessException(ErrorCode.PARAMS_ERROR);
    }

    // 检查权限是否已存在
    LambdaQueryWrapper<Permission> queryWrapper = new LambdaQueryWrapper<>();
    queryWrapper.eq(Permission::getUserRole, permission.getUserRole())
        .eq(Permission::getPermissionCode, permission.getPermissionCode());
    long count = permissionService.count(queryWrapper);
    if (count > 0) {
      throw new BusinessException(ErrorCode.PARAMS_ERROR, "该权限已存在");
    }

    boolean result = permissionService.save(permission);
    return ResultUtils.success(result);
  }

  /**
   * 删除权限
   *
   * @param id 权限ID
   * @return 是否成功
   */
  @DeleteMapping("/delete/{id}")
  @ApiOperation(value = "删除权限", notes = "删除权限")
  @SaCheckPermission("admin-user-delete")
  public BaseResponse<Boolean> deletePermission(@PathVariable Long id) {
    if (id == null || id <= 0) {
      throw new BusinessException(ErrorCode.PARAMS_ERROR);
    }
    boolean result = permissionService.removeById(id);
    return ResultUtils.success(result);
  }

  /**
   * 更新权限
   *
   * @param permission 权限信息
   * @return 是否成功
   */
  @PutMapping("/update")
  @ApiOperation(value = "更新权限", notes = "更新权限")
  @SaCheckPermission("admin-user-update")
  public BaseResponse<Boolean> updatePermission(@RequestBody Permission permission) {
    if (permission == null || permission.getId() == null) {
      throw new BusinessException(ErrorCode.PARAMS_ERROR);
    }
    boolean result = permissionService.updateById(permission);
    return ResultUtils.success(result);
  }
}