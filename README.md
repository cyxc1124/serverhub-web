# ServerHub Web

ServerHub 服务器管理系统 — 前端 Web 应用。

后端仓库：[serverhub-api](https://github.com/cyxc1124/serverhub-api)

## 技术栈

- **框架**: React 19 + TypeScript
- **构建工具**: Vite
- **UI 组件库**: Ant Design 5
- **路由**: React Router v7
- **HTTP 请求**: Axios

## 项目结构

```
serverhub-web/
├── src/
│   ├── api/            # API 请求封装
│   ├── components/     # 公共组件
│   ├── layouts/        # 布局组件
│   ├── pages/          # 页面
│   │   ├── login/      # 登录/注册
│   │   ├── dashboard/  # 仪表盘
│   │   ├── servers/    # 服务器管理
│   │   └── users/      # 用户管理
│   ├── store/          # 状态管理
│   └── utils/          # 工具函数
├── .env                # 环境变量
├── index.html
└── package.json
```

## 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器 (默认 http://localhost:5173)
npm run dev

# 构建生产版本
npm run build
```

## 环境变量

在 `.env` 中配置后端 API 地址：

```
VITE_API_BASE_URL=http://localhost:8000/api/v1
```
