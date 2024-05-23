# 代码说明

## 目录结构

所有代码都在src目录下,目录结构如下

```shell
.
├── App.js
├── index.css
├── index.js
├── pages
│   ├── manage
│   └── user
├── router
│   ├── index.js
│   ├── manageRouters.js
│   └── userRouters.js
└── utils
    ├── authorize.js
    ├── img2base64.js
    ├── initData.js
    └── userInfoVaild.js
```

其中index.js是入口文件，App.js是主页面，通过react-router-dom实现页面跳转，路由配置在router/index.js中,导入了userRouters(小组作业需要的路由)和manageRouters，utils文件夹下是一些工具函数，包括用户信息验证,权限验证和数据初始化等内容，pages文件夹下是各个页面的具体代码。index.css是导入的tailwindcss样式文件,用于自动生成css。

## 使用的插件

1. react-router-dom：用于实现页面跳转
2. tailwindcss：尝试使用tailwindcss来写样式
3. antd组件库：页面组件库,页面的元素均使用了antd组件使页面和谐美观

## 项目运行启动方式

`pnpm install`安装依赖
`pnpm start`启动项目
或者
`bun install`安装依赖
`bun start`启动项目

## 数据存储方式

项目启动的时候会初始化数据,数据存取使用了localStorage，将用户信息存储在localStorage中，每次进入页面时会先验证用户信息，如果用户信息不存在或者用户信息不正确，则会跳转到登录页面。
**注意**: 本项目需要的localStorage数据有：
username
user
privilege
privileges
使用前请先清除以前的数据，否则可能会出现问题

## 功能说明

### 注册登录

提供了注册和登录功能，注册时需要输入用户名和密码，登录时需要输入用户名和密码，登录成功后会跳转到主页面，登录失败会弹出提示框。注册时默认权限为普通用户，注册成功后会跳转到登录页面。进行密码复杂度验证,必须包含大小字母及数字，字数为8-16位，密码存储使用了SHA256加密，注册需要添加邮箱，需校验邮箱格式.
默认用户有:
|账号|密码|
|---|---|
|admin|Admin123456|
|user|User123456|
|seller|Seller123456|

### 权限管理

系统默认有三种权限的用户,分别是普通用户，管理员和卖家，不同权限的用户可以访问不同的页面，普通用户只能访问主页,没有其他管理权限，管理员可以访问主页和权限管理页面和商品管理页面，卖家可以访问主页和商品管理页面。用户权限存储在localStorage中，每次进入页面时会验证用户权限，如果用户权限不正确，则会跳转到登录页面。

### 侧边栏管理

系统根据用户权限动态生成侧边栏，不同权限的用户会看到不同的侧边栏，普通用户只能看到主页，管理员可以看到所有页面，卖家可以看到主页和商品管理页面。并且设置了路由拦截,如果用户直接通过路由跳转,如果权限验证失败就会跳转到登录界面。

### 用户管理

可以增删改查所有的用户信息
