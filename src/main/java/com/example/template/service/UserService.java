package com.example.template.service;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;
import com.example.template.model.dto.UserQueryRequest;
import com.example.template.model.entity.User;
import com.example.template.model.vo.UserVO;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * 用户服务
 */
public interface UserService extends IService<User> {

  /**
   * 用户注册
   *
   * @param userAccount   用户账户
   * @param userPassword  用户密码
   * @param checkPassword 校验密码
   * @param userName      用户昵称
   * @return 用户id
   */
  long userRegister(String userAccount, String userPassword, String checkPassword, String userName);

  /**
   * 用户登录
   *
   * @param userAccount  用户账户
   * @param userPassword 用户密码
   * @return 登录成功的用户信息
   */
  UserVO userLogin(String userAccount, String userPassword);

  /**
   * 获取当前登录用户
   *
   * @return 当前登录用户
   */
  User getLoginUser();

  /**
   * 是否为管理员
   *
   * @return 是否为管理员
   */
  boolean isAdmin();

  /**
   * 获取脱敏的用户信息
   *
   * @param user 用户信息
   * @return 脱敏的用户信息
   */
  UserVO getUserVO(User user);

  /**
   * 获取脱敏的用户信息列表
   *
   * @param userList 用户列表
   * @return 脱敏的用户信息列表
   */
  List<UserVO> getUserVO(List<User> userList);

  /**
   * 获取查询条件
   *
   * @param userQueryRequest 用户查询请求
   * @return 查询条件
   */
  QueryWrapper<User> getQueryWrapper(UserQueryRequest userQueryRequest);

  /**
   * 分页获取用户列表
   *
   * @param userQueryRequest 用户查询条件
   * @return 用户列表
   */
  Page<UserVO> listUserVOByPage(UserQueryRequest userQueryRequest);
}