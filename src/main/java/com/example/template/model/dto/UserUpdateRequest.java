package com.example.template.model.dto;

import lombok.Data;

import javax.validation.constraints.NotNull;
import java.io.Serializable;

/**
 * 用户更新请求
 */
@Data
public class UserUpdateRequest implements Serializable {

  private static final long serialVersionUID = 1L;

  /**
   * id
   */
  @NotNull(message = "用户ID不能为空")
  private Long id;

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
}