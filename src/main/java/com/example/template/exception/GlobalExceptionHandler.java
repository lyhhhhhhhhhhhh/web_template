package com.example.template.exception;

import cn.dev33.satoken.exception.NotLoginException;
import cn.dev33.satoken.exception.NotPermissionException;
import com.example.template.common.BaseResponse;
import com.example.template.common.ErrorCode;
import com.example.template.common.ResultUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

/**
 * 全局异常处理器
 */
@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

  /**
   * 业务异常
   */
  @ExceptionHandler(BusinessException.class)
  public BaseResponse<?> businessExceptionHandler(BusinessException e) {
    log.error("业务异常", e);
    return ResultUtils.error(e.getCode(), e.getMessage(), e.getDescription());
  }

  /**
   * 参数校验异常
   */
  @ExceptionHandler(MethodArgumentNotValidException.class)
  public BaseResponse<?> methodArgumentNotValidExceptionHandler(MethodArgumentNotValidException e) {
    log.error("参数校验异常", e);
    return ResultUtils.error(ErrorCode.PARAMS_ERROR, e.getBindingResult().getAllErrors().get(0).getDefaultMessage());
  }

  /**
   * 运行时异常
   */
  @ExceptionHandler(RuntimeException.class)
  public BaseResponse<?> runtimeExceptionHandler(RuntimeException e) {
    log.error("运行时异常", e);
    return ResultUtils.error(ErrorCode.SYSTEM_ERROR, e.getMessage());
  }

  /**
   * sa-token未登录异常
   */
  @ExceptionHandler(NotLoginException.class)
  public BaseResponse<?> notLoginExceptionHandler(NotLoginException e) {
    log.error("用户未登录", e);
    return ResultUtils.error(ErrorCode.NOT_LOGIN_ERROR);
  }

  /**
   * sa-tokenm当前用户无权限异常
   */
  @ExceptionHandler(NotPermissionException.class)
  public BaseResponse<?> notLoginExceptionHandler(NotPermissionException e) {
    log.error("用户没有此权限", e.getPermission());
    return ResultUtils.error(ErrorCode.NO_AUTH_ERROR, e.getPermission());
  }
}