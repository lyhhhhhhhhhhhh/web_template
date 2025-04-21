package com.example.template.config;

import cn.dev33.satoken.interceptor.SaInterceptor;
import cn.dev33.satoken.router.SaRouter;
import cn.dev33.satoken.stp.StpUtil;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Sa-Token 配置
 */
@Configuration
public class SaTokenConfig implements WebMvcConfigurer {

  /**
   * 注册 Sa-Token 拦截器，打开注解式鉴权功能
   */
  @Override
  public void addInterceptors(InterceptorRegistry registry) {
    // 注册 Sa-Token 拦截器，打开注解式鉴权功能
    registry.addInterceptor(new SaInterceptor(handler -> {
      // 登录认证 - 拦截所有路由，排除登录、注册等接口
      SaRouter.match("/**")
            .notMatch("OPTIONS")
          .notMatch("/user/login")
          .notMatch("/user/register")
          .notMatch("/doc.html/**")
          .notMatch("/swagger-resources/**")
          .notMatch("/swagger-ui/**")
          .notMatch("/v2/api-docs/**")
          .notMatch("/v3/api-docs/**")
          .notMatch("/webjars/**")
          .check(r -> StpUtil.checkLogin());

      // 权限认证 - 不同接口校验不同权限
      SaRouter.match("/user/add", r -> StpUtil.checkPermission("admin-user-add"));
      SaRouter.match("/user/delete/**", r -> StpUtil.checkPermission("admin-user-delete"));
      SaRouter.match("/user/get/**", r -> StpUtil.checkPermission("admin-user-select"));
      SaRouter.match("/user/list", r -> StpUtil.checkPermission("admin-user-select"));
    })).addPathPatterns("/**");
  }
}