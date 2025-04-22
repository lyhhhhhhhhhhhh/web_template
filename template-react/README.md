# React管理系统模板

## 简介

这是一个基于React的前端管理系统模板，使用了以下技术栈：

- Vite：快速的构建工具
- React：前端UI库
- TypeScript：类型安全的JavaScript
- Ant Design：UI组件库
- Redux Toolkit：状态管理
- Axios：HTTP请求库
- React Router：路由管理

## 功能特性

- 用户登录/注销
- 权限控制
- 用户管理（增删改查）
- 响应式布局
- Token身份验证

## 快速开始

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

访问 http://localhost:3000

### 构建生产版本

```bash
npm run build
```

## 目录结构

```
src/
├── components/        # 通用组件
├── pages/             # 页面组件
├── store/             # Redux store
│   └── slices/        # Redux切片
├── utils/             # 工具函数
├── App.tsx            # 应用入口
└── main.tsx           # 渲染入口
```

## 后端接口

该项目默认连接后端API，后端接口基地址为`/api`。

## 联系

如有问题，请联系项目维护者。