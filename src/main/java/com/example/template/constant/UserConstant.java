package com.example.template.constant;

/**
 * 用户常量
 */
public interface UserConstant {

  /**
   * 用户登录态键
   */
  String USER_LOGIN_STATE = "user_login";

  /**
   * 系统用户 id（虚拟用户）
   */
  long SYSTEM_USER_ID = 0;

  /**
   * 默认角色
   */
  String DEFAULT_ROLE = "user";

  /**
   * 管理员角色
   */
  String ADMIN_ROLE = "admin";

  /**
   * 被封号角色
   */
  String BAN_ROLE = "ban";

  /**
   * 盐值，混淆密码
   */
  String SALT = "template";
}