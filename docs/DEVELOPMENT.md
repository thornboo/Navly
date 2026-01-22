# 开发指南

本文档面向维护 Navly 仓库的开发者，聚焦“如何开发本项目”，不包含从零搭建脚手架的教程。

## 环境要求

- Node.js >= 18
- pnpm >= 8（推荐）

## 快速开始

1. 安装依赖：

```bash
pnpm install
```

2. 配置环境变量（创建 `.env.local`）：

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

3. 启动开发：

```bash
pnpm dev
```

默认访问：http://localhost:3000

## 常用命令

```bash
pnpm lint
pnpm format
pnpm format:check
pnpm build
pnpm start
```

## 代码结构与约定

### 目录结构

```
components/
├── ui/                      # 通用 UI 组件
├── layout/                  # 布局组件
└── pages/                   # 页面级模块组件（按路由拆分）
    └── integrations/
lib/                         # 数据访问与工具函数
types/                       # 共享类型
```

### 注释规范

- 仅在必要处写注释（解释“为什么”，避免解释“是什么”）
- 所有代码注释统一使用英文

### 数据访问

- 统一通过 `lib/data.ts` 调用 Supabase 查询
- `lib/supabase.ts` 提供共享 Supabase client
- 类型定义放在 `types/`，避免在组件中散落匿名结构

## Supabase

请参阅：

- [Supabase 配置指南](./SUPABASE_SETUP.md)
- [Supabase 操作清单](./SUPABASE_CHECKLIST.md)
