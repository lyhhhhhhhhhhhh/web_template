package com.example.template.model.dto;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import java.io.Serializable;

/**
 * 用户登录请求
 */
@Data
public class UserLoginRequest implements Serializable {

  private static final long serialVersionUID = 1L;

  /**
   * 用户账号
   */
  @NotBlank(message = "账号不能为空")
  private String userAccount;

  /**
   * 用户密码
   */
  @NotBlank(message = "密码不能为空")
  private String userPassword;
}