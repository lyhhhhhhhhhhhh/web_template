package com.example.template.model.dto;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.io.Serializable;

/**
 * 用户注册请求
 */
@Data
public class UserRegisterRequest implements Serializable {

  private static final long serialVersionUID = 1L;

  /**
   * 用户账号
   */
  @NotBlank(message = "账号不能为空")
  @Size(min = 4, max = 20, message = "账号长度应在4-20个字符之间")
  @Pattern(regexp = "^[a-zA-Z0-9_]+$", message = "账号只能包含字母、数字和下划线")
  private String userAccount;

  /**
   * 用户密码
   */
  @NotBlank(message = "密码不能为空")
  @Size(min = 6, max = 20, message = "密码长度应在6-20个字符之间")
  private String userPassword;

  /**
   * 确认密码
   */
  @NotBlank(message = "确认密码不能为空")
  private String checkPassword;

  /**
   * 用户昵称
   */
  private String userName;
}