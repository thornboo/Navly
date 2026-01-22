# 技术架构文档

## 架构概览

Navly 基于 Next.js App Router 构建，前端以 React + TypeScript 组织 UI 与交互，数据层通过 `@supabase/supabase-js` 访问 Supabase（PostgreSQL）。

核心分层（按职责）：

- `app/`：路由与页面入口（App Router）
- `components/`：UI 与页面模块组件
- `lib/`：通用工具与数据访问（Supabase client + queries）
- `types/`：跨层共享的 TypeScript 类型

## 数据流

当前首页（Integrations）页面在客户端加载数据：

1. 页面组件触发数据加载
2. 调用 `lib/data.ts` 中的数据访问函数
3. `lib/supabase.ts` 提供共享 Supabase client
4. 数据映射为前端 `types/*` 中的结构后返回 UI 渲染

## 目录结构

```
Navly/
├── app/                         # Next.js App Router
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Home page (Integrations)
│   └── globals.css              # Global styles
├── components/
│   ├── ui/                      # Reusable UI components
│   ├── layout/                  # Layout components
│   └── pages/                   # Page-level modules (scoped by route)
│       └── integrations/        # Integrations page modules
├── lib/                         # Data access & utilities
├── types/                       # Shared TypeScript types
├── data/                        # Backup/sample data
├── docs/                        # Project docs (中文)
└── public/                      # Static assets
```

## 组件分层约定

- `components/ui/`：通用 UI（不绑定特定页面/路由）
- `components/layout/`：布局结构组件（导航、布局容器等）
- `components/pages/<route>/`：页面专属模块，只服务于某个页面；若后续页面增多，按路由拆分

## 状态与主题

- 业务状态：以页面局部 state 为主（React hooks）
- 主题：通过 `localStorage` + `prefers-color-scheme` 决定，并同步到 `document.documentElement` 的 `dark` class

## 代码规范

项目使用 ESLint 与 Prettier：

- `pnpm lint`
- `pnpm format`
- `pnpm format:check`
