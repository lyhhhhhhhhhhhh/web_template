package com.example.template.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2WebMvc;

/**
 * Knife4j 接口文档配置
 */
@Configuration
@EnableSwagger2WebMvc
@Profile({ "dev", "test" })
public class Knife4jConfig {

  @Bean
  public Docket defaultApi2() {
    return new Docket(DocumentationType.SWAGGER_2)
        .apiInfo(apiInfo())
        .select()
        // 指定 Controller 扫描包路径
        .apis(RequestHandlerSelectors.basePackage("com.example.template.controller"))
        .paths(PathSelectors.any())
        .build();
  }

  /**
   * API信息
   */
  private ApiInfo apiInfo() {
    return new ApiInfoBuilder()
        .title("后端模板项目接口文档")
        .description("Spring Boot+MybatisPlus+Sa-Token实现的后端模板")
        .termsOfServiceUrl("https://github.com/your-username/template")
        .contact(new Contact("作者", "https://github.com/your-username", "example@example.com"))
        .version("1.0.0")
        .build();
  }
}