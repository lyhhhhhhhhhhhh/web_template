package com.example.template.model.entity;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * 用户角色权限实体
 */
@TableName(value = "user_role")
@Data
public class UserRole implements Serializable {

  /**
   * 权限id
   */
  @TableId(type = IdType.AUTO)
  private Long id;

  /**
   * 角色名称
   */
  private String roleName;

  /**
   * 角色代码
   */
  private String roleCode;

  /**
   * 权限描述
   */
  private String roleDescription;

  /**
   * 创建时间
   */
  private Date createTime;

  /**
   * 更新时间
   */
  private Date updateTime;

  /**
   * 是否删除
   */
  @TableLogic
  private Integer isDelete;

  @TableField(exist = false)
  private static final long serialVersionUID = 1L;
}