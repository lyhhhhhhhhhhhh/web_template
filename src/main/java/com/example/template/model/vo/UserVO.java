package com.example.template.model.vo;

import cn.dev33.satoken.stp.SaTokenInfo;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * 用户视图
 */
@Data
public class UserVO implements Serializable {

  private static final long serialVersionUID = 1L;

  /**
   * id
   */
  private Long id;

  /**
   * 用户账号
   */
  private String userAccount;

  /**
   * 用户昵称
   */
  private String userName;

  /**
   * 用户头像
   */
  private String userAvatar;

  /**
   * 用户简介
   */
  private String userProfile;

  /**
   * 用户角色：user/admin/ban
   */
  private String userRole;

  /**
   * 创建时间
   */
  private Date createTime;

  /**
   * token
   */
  private SaTokenInfo token;
}