package com.example.template.service.impl;

import cn.dev33.satoken.stp.SaTokenInfo;
import cn.dev33.satoken.stp.StpUtil;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.template.common.ErrorCode;
import com.example.template.exception.BusinessException;
import com.example.template.mapper.UserMapper;
import com.example.template.model.dto.UserQueryRequest;
import com.example.template.model.entity.User;
import com.example.template.model.vo.UserVO;
import com.example.template.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.util.DigestUtils;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

import static com.example.template.constant.UserConstant.ADMIN_ROLE;
import static com.example.template.constant.UserConstant.SALT;

/**
 * 用户服务实现
 */
@Service
@Slf4j
public class UserServiceImpl extends ServiceImpl<UserMapper, User> implements UserService {

  @Override
  public long userRegister(String userAccount, String userPassword, String checkPassword, String userName) {
    // 1. 校验
    if (StringUtils.isAnyBlank(userAccount, userPassword, checkPassword)) {
      throw new BusinessException(ErrorCode.PARAMS_ERROR, "参数为空");
    }
    if (userAccount.length() < 4) {
      throw new BusinessException(ErrorCode.PARAMS_ERROR, "用户账号过短");
    }
    if (userPassword.length() < 6 || checkPassword.length() < 6) {
      throw new BusinessException(ErrorCode.PARAMS_ERROR, "用户密码过短");
    }
    // 账户不能包含特殊字符
    String validPattern = "[`~!@#$%^&*()+=|{}':;',\\[\\].<>/?]";
    Matcher matcher = Pattern.compile(validPattern).matcher(userAccount);
    if (matcher.find()) {
      throw new BusinessException(ErrorCode.PARAMS_ERROR, "账号包含特殊字符");
    }
    // 密码和校验密码相同
    if (!userPassword.equals(checkPassword)) {
      throw new BusinessException(ErrorCode.PARAMS_ERROR, "两次输入的密码不一致");
    }
    // 账户不能重复
    QueryWrapper<User> queryWrapper = new QueryWrapper<>();
    queryWrapper.eq("userAccount", userAccount);
    long count = this.count(queryWrapper);
    if (count > 0) {
      throw new BusinessException(ErrorCode.PARAMS_ERROR, "账号已存在");
    }
    // 2. 加密
    String encryptPassword = DigestUtils.md5DigestAsHex((SALT + userPassword).getBytes());
    // 3. 插入数据
    User user = new User();
    user.setUserAccount(userAccount);
    user.setUserPassword(encryptPassword);
    user.setUserName(userName);
    boolean saveResult = this.save(user);
    if (!saveResult) {
      throw new BusinessException(ErrorCode.SYSTEM_ERROR, "注册失败，数据库错误");
    }
    return user.getId();
  }

  @Override
  public UserVO userLogin(String userAccount, String userPassword) {
    // 1. 校验
    if (StringUtils.isAnyBlank(userAccount, userPassword)) {
      throw new BusinessException(ErrorCode.PARAMS_ERROR, "参数为空");
    }
    if (userAccount.length() < 4) {
      throw new BusinessException(ErrorCode.PARAMS_ERROR, "账号长度不能小于4位");
    }
    if (userPassword.length() < 6) {
      throw new BusinessException(ErrorCode.PARAMS_ERROR, "密码长度不能小于6位");
    }
    // 2. 加密
    String encryptPassword = DigestUtils.md5DigestAsHex((SALT + userPassword).getBytes());
    // 查询用户
    QueryWrapper<User> queryWrapper = new QueryWrapper<>();
    queryWrapper.eq("userAccount", userAccount);
    queryWrapper.eq("userPassword", encryptPassword);
    User user = this.getOne(queryWrapper);
    // 用户不存在
    if (user == null) {
      log.info("user login failed, userAccount cannot match userPassword");
      throw new BusinessException(ErrorCode.PARAMS_ERROR, "用户名或密码错误");
    }
    // 3. 记录用户的登录态
    StpUtil.login(user.getId());
    return getUserVO(user);
  }

  @Override
  public User getLoginUser() {
    // 获取当前登录用户ID
    Long userId = StpUtil.getLoginIdAsLong();
    User user = this.getById(userId);
    if (user == null) {
      throw new BusinessException(ErrorCode.NOT_LOGIN_ERROR);
    }
    return user;
  }

  @Override
  public boolean isAdmin() {
    // 仅管理员可查询
    User user = getLoginUser();
    return ADMIN_ROLE.equals(user.getUserRole());
  }

  @Override
  public UserVO getUserVO(User user) {
    if (user == null) {
      return null;
    }
    UserVO userVO = new UserVO();
    BeanUtils.copyProperties(user, userVO);
    SaTokenInfo tokenInfo = StpUtil.getTokenInfo();
    userVO.setToken(tokenInfo);
    return userVO;
  }

  @Override
  public List<UserVO> getUserVO(List<User> userList) {
    if (userList == null) {
      return new ArrayList<>();
    }
    return userList.stream().map(this::getUserVO).collect(Collectors.toList());
  }

  @Override
  public QueryWrapper<User> getQueryWrapper(UserQueryRequest userQueryRequest) {
    if (userQueryRequest == null) {
      throw new BusinessException(ErrorCode.PARAMS_ERROR, "请求参数为空");
    }
    Long id = userQueryRequest.getId();
    String userName = userQueryRequest.getUserName();
    String userRole = userQueryRequest.getUserRole();
    String sortField = userQueryRequest.getSortField();
    String sortOrder = userQueryRequest.getSortOrder();
    QueryWrapper<User> queryWrapper = new QueryWrapper<>();
    queryWrapper.eq(id != null, "id", id);
    queryWrapper.eq(StringUtils.isNotBlank(userRole), "userRole", userRole);
    queryWrapper.like(StringUtils.isNotBlank(userName), "userName", userName);
    queryWrapper.orderBy(StringUtils.isNotBlank(sortField),
        sortOrder.equals("ascend"), sortField);
    return queryWrapper;
  }

  @Override
  public Page<UserVO> listUserVOByPage(UserQueryRequest userQueryRequest) {
    long current = userQueryRequest.getCurrent();
    long size = userQueryRequest.getPageSize();
    Page<User> userPage = this.page(new Page<>(current, size),
        this.getQueryWrapper(userQueryRequest));
    Page<UserVO> userVOPage = new Page<>(current, size, userPage.getTotal());
    List<UserVO> userVO = this.getUserVO(userPage.getRecords());
    userVOPage.setRecords(userVO);
    return userVOPage;
  }
}