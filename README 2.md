# 目录结构
所有代码都在src目录下,目录结构如下
```
│  App.js
│  index.css
│  index.js
│
├─pages
│      Dashboard.js
│      Login.js
│      menuControl.js
│      roleControl.js
│      userControl.js
│
├─router
│      index.js
│
└─utils
        authorize.js
        userInfoVaild.js
```
其中index.js是入口文件，App.js是主页面，通过react-router-dom实现页面跳转，路由配置在router/index.js中，utils文件夹下是一些工具函数，包括用户信息验证和权限验证，pages文件夹下是各个页面的具体代码。index.css是导入的tailwindcss样式文件,用于自动生成css。

# 使用的插件
1. react-router-dom：用于实现页面跳转
2. tailwindcss：尝试使用taiulwindcss来写样式
3. antd组件库：页面组件库,页面的元素均使用了antd组件使页面和谐美观

# 项目运行启动方式
`pnpm install`安装依赖
`pnpm start`启动项目
或者
`bun install`安装依赖
`bun start`启动项目

# 数据存储方式
数据存取使用了localStorage，将用户信息存储在localStorage中，每次进入页面时会先验证用户信息，如果用户信息不存在或者用户信息不正确，则会跳转到登录页面。
**注意**: 本项目需要的localStorage数据有：	
username	
user	
privilege
privileges
使用前请先清除以前的数据，否则可能会出现问题