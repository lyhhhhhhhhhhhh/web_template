package com.example.template.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.example.template.model.entity.Permission;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;

/**
 * 权限Mapper
 */
public interface PermissionMapper extends BaseMapper<Permission> {

  /**
   * 获取指定角色的所有权限代码
   * 
   * @param userRole 用户角色
   * @return 权限代码列表
   */
  @Select("SELECT permissionCode FROM permission WHERE userRole = #{userRole} AND isDelete = 0")
  List<String> getPermissionCodesByRole(@Param("userRole") String userRole);
}