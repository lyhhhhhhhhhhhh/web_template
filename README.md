# 后端模板项目

基于 SpringBoot + MyBatis-Plus + Sa-Token + Knife4j 实现的后端模板项目，集成了用户注册、登录、权限认证等基础功能。

## 技术栈

- SpringBoot 2.7.13
- MyBatis-Plus 3.5.3.1
- Sa-Token 1.34.0
- Knife4j 4.1.0
- MySQL 8.0+

## 功能特性

- 用户管理：用户注册、登录、注销、信息修改
- 权限认证：基于 Sa-Token 的细粒度权限控制
- 接口文档：集成 Knife4j 的 API 文档
- 全局异常处理：统一异常处理机制
- 参数校验：接口参数校验
- 逻辑删除：支持数据的逻辑删除

## 项目结构

```
src/main/java/com/example/template/
├── config          // 配置类
├── controller      // 控制器
├── service         // 服务层
├── mapper          // 数据访问层
├── model           // 数据模型
│   ├── dto         // 数据传输对象
│   ├── entity      // 实体类
│   └── vo          // 视图对象
├── common          // 通用类
├── constant        // 常量
├── exception       // 异常处理
└── TemplateApplication.java // 启动类
```

## 快速开始

### 环境要求

- JDK 1.8+
- Maven 3.6+
- MySQL 8.0+

### 本地运行

1. 克隆项目到本地
   ```bash
   git clone https://github.com/your-username/template.git
   ```

2. 创建数据库
   ```sql
   CREATE DATABASE template DEFAULT CHARACTER SET utf8mb4;
   ```

3. 执行 SQL 脚本
   ```
   运行 src/main/resources/sql/init.sql 文件初始化表结构和基础数据
   ```

4. 修改配置
   ```
   编辑 src/main/resources/application.yml 文件，配置数据库连接信息
   ```

5. 使用 Maven 编译和运行
   ```bash
   mvn clean package
   java -jar target/template-0.0.1-SNAPSHOT.jar
   ```

6. 访问接口文档
   ```
   http://localhost:8080/api/doc.html
   ```

## 用户角色和权限说明

### 角色说明

系统预设三种角色：
- admin：管理员角色，拥有所有权限
- user：普通用户角色，拥有基本操作权限
- ban：被封禁用户，无权限

### 权限说明

系统采用基于 Sa-Token 的细粒度权限控制，预设权限包括：

**管理员权限**：
- admin-user-add：添加用户权限
- admin-user-delete：删除用户权限
- admin-user-update：更新用户权限
- admin-user-select：查询用户权限

**普通用户权限**：
- user-select：普通用户查询权限
- user-update：普通用户更新权限

权限控制通过两种方式实现：
1. 注解方式：在Controller方法上使用 `@SaCheckPermission` 注解
2. 代码方式：通过 `StpUtil.hasPermission()` 方法进行权限验证

## 接口说明

### 用户模块

| 接口               | 请求方式 | 说明                     | 权限要求              |
|-------------------|---------|-------------------------|---------------------|
| /user/register    | POST    | 用户注册                  | 无需登录             |
| /user/login       | POST    | 用户登录                  | 无需登录             |
| /user/logout      | POST    | 用户注销                  | 无需登录             |
| /user/current     | GET     | 获取当前登录用户信息        | 需要登录             |
| /user/update      | PUT     | 更新用户信息               | user-update或admin-user-update |
| /user/add         | POST    | 添加用户                  | admin-user-add      |
| /user/delete/{id} | DELETE  | 删除用户                  | admin-user-delete   |
| /user/get/{id}    | GET     | 根据ID获取用户信息         | admin-user-select   |
| /user/list        | GET     | 获取用户列表（支持分页查询） | admin-user-select   |

### 权限模块

| 接口                      | 请求方式 | 说明                     | 权限要求               |
|--------------------------|---------|-------------------------|---------------------|
| /permission/list         | GET     | 获取所有权限               | admin-user-select   |
| /permission/list/{role}  | GET     | 获取指定角色的权限列表       | admin-user-select   |
| /permission/add          | POST    | 添加权限                  | admin-user-add      |
| /permission/delete/{id}  | DELETE  | 删除权限                  | admin-user-delete   |
| /permission/update       | PUT     | 更新权限                  | admin-user-update   |

## 贡献指南

欢迎贡献代码，提交问题和建议！
