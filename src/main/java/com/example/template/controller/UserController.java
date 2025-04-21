package com.example.template.controller;

import cn.dev33.satoken.annotation.SaCheckLogin;
import cn.dev33.satoken.annotation.SaCheckPermission;
import cn.dev33.satoken.annotation.SaCheckRole;
import cn.dev33.satoken.stp.StpUtil;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.example.template.common.BaseResponse;
import com.example.template.common.ErrorCode;
import com.example.template.common.ResultUtils;
import com.example.template.exception.BusinessException;
import com.example.template.model.dto.UserLoginRequest;
import com.example.template.model.dto.UserQueryRequest;
import com.example.template.model.dto.UserRegisterRequest;
import com.example.template.model.dto.UserUpdateRequest;
import com.example.template.model.entity.User;
import com.example.template.model.vo.UserVO;
import com.example.template.service.UserService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.validation.Valid;

/**
 * 用户接口
 */
@RestController
@RequestMapping("/user")
@Api(tags = "用户接口")
@Slf4j
public class UserController {

  @Resource
  private UserService userService;

  /**
   * 用户注册
   *
   * @param userRegisterRequest 用户注册请求
   * @return 注册用户id
   */
  @PostMapping("/register")
  @ApiOperation(value = "用户注册", notes = "用户注册")
  public BaseResponse<Long> userRegister(@RequestBody @Valid UserRegisterRequest userRegisterRequest) {
    if (userRegisterRequest == null) {
      throw new BusinessException(ErrorCode.PARAMS_ERROR);
    }
    String userAccount = userRegisterRequest.getUserAccount();
    String userPassword = userRegisterRequest.getUserPassword();
    String checkPassword = userRegisterRequest.getCheckPassword();
    String userName = userRegisterRequest.getUserName();

    long result = userService.userRegister(userAccount, userPassword, checkPassword, userName);
    return ResultUtils.success(result);
  }

  /**
   * 用户登录
   *
   * @param userLoginRequest 用户登录请求
   * @return 登录用户信息
   */
  @PostMapping("/login")
  @ApiOperation(value = "用户登录", notes = "用户登录")
  public BaseResponse<UserVO> userLogin(@RequestBody @Valid UserLoginRequest userLoginRequest) {
    if (userLoginRequest == null) {
      throw new BusinessException(ErrorCode.PARAMS_ERROR);
    }
    String userAccount = userLoginRequest.getUserAccount();
    String userPassword = userLoginRequest.getUserPassword();

    UserVO userVO = userService.userLogin(userAccount, userPassword);
    return ResultUtils.success(userVO);
  }

  /**
   * 用户注销
   *
   * @return 是否成功
   */
  @PostMapping("/logout")
  @ApiOperation(value = "用户注销", notes = "用户注销")
  public BaseResponse<Boolean> userLogout() {
    StpUtil.logout();
    return ResultUtils.success(true);
  }

  /**
   * 获取当前登录用户
   *
   * @return 当前登录用户
   */
  @GetMapping("/current")
  @ApiOperation(value = "获取当前登录用户", notes = "获取当前登录用户")
  @SaCheckLogin
  public BaseResponse<UserVO> getCurrentUser() {
    User user = userService.getLoginUser();
    UserVO userVO = userService.getUserVO(user);
    return ResultUtils.success(userVO);
  }

  /**
   * 创建用户（需要admin-user-add权限）
   *
   * @param userRegisterRequest 用户创建请求
   * @return 创建用户id
   */
  @PostMapping("/add")
  @ApiOperation(value = "创建用户", notes = "创建用户（需要admin-user-add权限）")
  @SaCheckPermission("admin-user-add")
  public BaseResponse<Long> addUser(@RequestBody @Valid UserRegisterRequest userRegisterRequest) {
    if (userRegisterRequest == null) {
      throw new BusinessException(ErrorCode.PARAMS_ERROR);
    }
    String userAccount = userRegisterRequest.getUserAccount();
    String userPassword = userRegisterRequest.getUserPassword();
    // 创建用户默认密码与校验密码相同
    String checkPassword = userPassword;
    String userName = userRegisterRequest.getUserName();

    long result = userService.userRegister(userAccount, userPassword, checkPassword, userName);
    return ResultUtils.success(result);
  }

  /**
   * 删除用户（需要admin-user-delete权限）
   *
   * @param id 用户id
   * @return 是否成功
   */
  @DeleteMapping("/delete/{id}")
  @ApiOperation(value = "删除用户", notes = "删除用户（需要admin-user-delete权限）")
  @SaCheckPermission("admin-user-delete")
  public BaseResponse<Boolean> deleteUser(@PathVariable Long id) {
    if (id == null || id <= 0) {
      throw new BusinessException(ErrorCode.PARAMS_ERROR);
    }
    boolean result = userService.removeById(id);
    return ResultUtils.success(result);
  }

  /**
   * 更新用户
   *
   * @param userUpdateRequest 用户更新请求
   * @return 是否成功
   */
  @PutMapping("/update")
  @ApiOperation(value = "更新用户", notes = "更新用户（需要admin-user-update权限或user-update权限）")
  @SaCheckLogin
  public BaseResponse<Boolean> updateUser(@RequestBody @Valid UserUpdateRequest userUpdateRequest) {
    if (userUpdateRequest == null) {
      throw new BusinessException(ErrorCode.PARAMS_ERROR);
    }

    // 只能更新自己的信息，除非是管理员
    User loginUser = userService.getLoginUser();
    boolean isAdmin = userService.isAdmin();

    // 如果是管理员，需要校验admin-user-update权限
    if (isAdmin) {
      if (!StpUtil.hasPermission("admin-user-update")) {
        throw new BusinessException(ErrorCode.NO_AUTH_ERROR, "没有admin-user-update权限");
      }
    } else {
      // 普通用户，只能修改自己的信息，且需要user-update权限
      if (!userUpdateRequest.getId().equals(loginUser.getId())) {
        throw new BusinessException(ErrorCode.NO_AUTH_ERROR, "只能修改自己的信息");
      }
      if (!StpUtil.hasPermission("user-update")) {
        throw new BusinessException(ErrorCode.NO_AUTH_ERROR, "没有user-update权限");
      }
    }

    User user = new User();
    BeanUtils.copyProperties(userUpdateRequest, user);

    boolean result = userService.updateById(user);
    return ResultUtils.success(result);
  }

  /**
   * 根据 id 获取用户（需要admin-user-select权限）
   *
   * @param id 用户id
   * @return 用户信息
   */
  @GetMapping("/get/{id}")
  @ApiOperation(value = "根据id获取用户", notes = "根据id获取用户（需要admin-user-select权限）")
  @SaCheckPermission("admin-user-select")
  public BaseResponse<UserVO> getUserById(@PathVariable Long id) {
    if (id == null || id <= 0) {
      throw new BusinessException(ErrorCode.PARAMS_ERROR);
    }
    User user = userService.getById(id);
    if (user == null) {
      throw new BusinessException(ErrorCode.NOT_FOUND_ERROR);
    }
    UserVO userVO = userService.getUserVO(user);
    return ResultUtils.success(userVO);
  }

  /**
   * 获取用户列表（需要admin-user-select权限）
   *
   * @param userQueryRequest 用户查询请求
   * @return 用户列表
   */
  @GetMapping("/list")
  @ApiOperation(value = "获取用户列表", notes = "获取用户列表（需要admin-user-select权限）")
  @SaCheckPermission("admin-user-select")
  public BaseResponse<Page<UserVO>> listUser(UserQueryRequest userQueryRequest) {
    if (userQueryRequest == null) {
      throw new BusinessException(ErrorCode.PARAMS_ERROR);
    }
    Page<UserVO> userVOPage = userService.listUserVOByPage(userQueryRequest);
    return ResultUtils.success(userVOPage);
  }
}