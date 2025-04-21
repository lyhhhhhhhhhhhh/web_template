package com.example.template.controller;

import cn.dev33.satoken.annotation.SaCheckPermission;
import com.example.template.common.BaseResponse;
import com.example.template.common.ResultUtils;
import com.example.template.constant.UserConstant;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * 首页接口
 */
@RestController
@Api(tags = "首页接口")
public class IndexController {

  /**
   * 测试接口
   *
   * @return 测试数据
   */
  @GetMapping("/")
  @ApiOperation(value = "首页", notes = "首页")
  @SaCheckPermission(value = "user-select",orRole = UserConstant.ADMIN_ROLE)
  public BaseResponse<String> index() {
    return ResultUtils.success("Hello World!");
  }
}