package com.example.template.common;

/**
 * 错误码
 */
public enum ErrorCode {

  SUCCESS(0, "成功", ""),
  PARAMS_ERROR(40000, "请求参数错误", ""),
  NOT_LOGIN_ERROR(40100, "未登录", ""),
  NO_AUTH_ERROR(40101, "无权限", ""),
  FORBIDDEN_ERROR(40300, "禁止访问", ""),
  NOT_FOUND_ERROR(40400, "请求数据不存在", ""),
  SYSTEM_ERROR(50000, "系统内部异常", "");

  /**
   * 状态码
   */
  private final int code;

  /**
   * 信息
   */
  private final String message;

  /**
   * 描述
   */
  private final String description;

  ErrorCode(int code, String message, String description) {
    this.code = code;
    this.message = message;
    this.description = description;
  }

  public int getCode() {
    return code;
  }

  public String getMessage() {
    return message;
  }

  public String getDescription() {
    return description;
  }
}