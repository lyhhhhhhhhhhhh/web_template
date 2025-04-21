-- 用户表
create table if not exists user
(
    id           bigint auto_increment comment 'id' primary key,
    userAccount  varchar(256)                           not null comment '账号',
    userPassword varchar(512)                           not null comment '密码',
    unionId      varchar(256)                           null comment '微信开放平台id',
    mpOpenId     varchar(256)                           null comment '公众号openId',
    userName     varchar(256)                           null comment '用户昵称',
    userAvatar   varchar(1024)                          null comment '用户头像',
    userProfile  varchar(512)                           null comment '用户简介',
    userRole     varchar(256) default 'user'            not null comment '用户角色：user/admin/ban',
    editTime     datetime     default CURRENT_TIMESTAMP not null comment '编辑时间',
    createTime   datetime     default CURRENT_TIMESTAMP not null comment '创建时间',
    updateTime   datetime     default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP comment '更新时间',
    isDelete     tinyint      default 0                 not null comment '是否删除',
    index idx_unionId (unionId)
) comment '用户' collate = utf8mb4_unicode_ci;

-- 用户角色表
create table if not exists user_role
(
    id              bigint auto_increment comment '权限id' primary key,
    roleName        varchar(256)                           not null comment '角色名称',
    roleCode        varchar(256)                           not null comment '角色代码',
    roleDescription varchar(512)                           null comment '权限描述',
    createTime      datetime     default CURRENT_TIMESTAMP not null comment '创建时间',
    updateTime      datetime     default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP comment '更新时间',
    isDelete        tinyint      default 0                 not null comment '是否删除'
) comment '用户角色' collate = utf8mb4_unicode_ci;

-- 权限表
create table if not exists permission
(
    id              bigint auto_increment comment '权限id' primary key,
    userRole        varchar(256)                           not null comment '用户角色',
    permissionCode  varchar(256)                           not null comment '权限代码',
    permissionDesc  varchar(512)                           null comment '权限描述',
    createTime      datetime     default CURRENT_TIMESTAMP not null comment '创建时间',
    updateTime      datetime     default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP comment '更新时间',
    isDelete        tinyint      default 0                 not null comment '是否删除',
    index idx_user_role (userRole),
    index idx_permission_code (permissionCode)
) comment '权限' collate = utf8mb4_unicode_ci;

-- 初始化角色数据
INSERT INTO user_role (roleName, roleCode, roleDescription) VALUES 
('管理员', 'admin', '系统管理员，拥有所有权限'),
('普通用户', 'user', '普通用户，拥有基本权限'),
('被封禁用户', 'ban', '被封禁的用户，无法使用系统');

-- 初始化管理员用户
INSERT INTO user (userAccount, userPassword, userName, userRole) VALUES 
('admin', 'e10adc3949ba59abbe56e057f20f883e', '管理员', 'admin'); -- 密码为123456的MD5值

-- 初始化权限数据 - 管理员权限
INSERT INTO permission (userRole, permissionCode, permissionDesc) VALUES 
('admin', 'admin-user-add', '添加用户权限'),
('admin', 'admin-user-select', '查询用户权限'),
('admin', 'admin-user-delete', '删除用户权限'),
('admin', 'admin-user-update', '更新用户权限');

-- 初始化权限数据 - 普通用户权限
INSERT INTO permission (userRole, permissionCode, permissionDesc) VALUES
('user', 'user-select', '普通用户查询权限'),
('user', 'user-update', '普通用户更新权限'),
('user', 'user-delete', '普通用户删除权限'),
('user', 'user-add', '普通用户添加权限');