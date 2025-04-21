package com.example.template.common;

/**
 * 返回工具类
 */
public class ResultUtils {

  /**
   * 成功
   *
   * @param data 数据
   * @param <T>  泛型
   * @return 通用返回类
   */
  public static <T> BaseResponse<T> success(T data) {
    return new BaseResponse<>(0, data, "成功");
  }

  /**
   * 失败
   *
   * @param errorCode 错误码
   * @return 通用返回类
   */
  public static <T> BaseResponse<T> error(ErrorCode errorCode) {
    return new BaseResponse<>(errorCode);
  }

  /**
   * 失败
   *
   * @param code        错误码
   * @param message     错误信息
   * @param description 错误描述
   * @return 通用返回类
   */
  public static <T> BaseResponse<T> error(int code, String message, String description) {
    return new BaseResponse<>(code, null, message, description);
  }

  /**
   * 失败
   *
   * @param errorCode   错误码
   * @param description 错误描述
   * @return 通用返回类
   */
  public static <T> BaseResponse<T> error(ErrorCode errorCode, String description) {
    return new BaseResponse<>(errorCode.getCode(), null, errorCode.getMessage(), description);
  }
}