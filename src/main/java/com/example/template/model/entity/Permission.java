package com.example.template.model.entity;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * 权限实体
 */
@TableName(value = "permission")
@Data
public class Permission implements Serializable {

  /**
   * 权限id
   */
  @TableId(type = IdType.AUTO)
  private Long id;

  /**
   * 用户角色
   */
  private String userRole;

  /**
   * 权限代码
   */
  private String permissionCode;

  /**
   * 权限描述
   */
  private String permissionDesc;

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