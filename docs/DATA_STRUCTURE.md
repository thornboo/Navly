# 数据结构设计文档

本文档详细说明 Navly 项目的数据模型设计，包括静态数据结构和云数据库方案。

## 核心数据模型

### 1. Integration（集成工具）

集成工具是系统的核心数据实体，代表一个可访问的工具或服务。

#### TypeScript 类型定义

```typescript
// src/types/integration.ts

/**
 * 集成工具数据模型
 */
export interface Integration {
  /** 唯一标识符 */
  id: string;

  /** 工具名称 */
  name: string;

  /** 工具描述 */
  description: string;

  /** 图标 URL 或路径 */
  icon: string;

  /** 工具链接 */
  url: string;

  /** 分类标签 */
  category: CategoryType;

  /** 是否为特色展示 */
  featured: boolean;

  /** 标签列表（用于搜索和过滤） */
  tags: string[];

  /** 背景颜色（可选，用于卡片背景） */
  backgroundColor?: string;

  /** 创建时间 */
  createdAt: string;

  /** 更新时间 */
  updatedAt: string;

  /** 排序权重（数字越大越靠前） */
  order?: number;

  /** 是否启用 */
  enabled: boolean;
}

/**
 * 分类类型
 */
export type CategoryType =
  | 'all' // 全部
  | 'devtools' // 开发工具
  | 'messaging' // 消息通讯
  | 'monitoring' // 监控
  | 'productivity' // 生产力
  | 'security' // 安全
  | 'searching'; // 搜索

/**
 * 集成工具创建 DTO
 */
export interface CreateIntegrationDto {
  name: string;
  description: string;
  icon: string;
  url: string;
  category: CategoryType;
  featured?: boolean;
  tags?: string[];
  backgroundColor?: string;
  order?: number;
}

/**
 * 集成工具更新 DTO
 */
export interface UpdateIntegrationDto extends Partial<CreateIntegrationDto> {
  enabled?: boolean;
}
```

### 2. Category（分类）

分类用于组织和过滤集成工具。

#### TypeScript 类型定义

```typescript
// src/types/category.ts

/**
 * 分类数据模型
 */
export interface Category {
  /** 分类 ID */
  id: CategoryType;

  /** 分类名称 */
  name: string;

  /** 分类描述 */
  description?: string;

  /** 图标 */
  icon?: string;

  /** 排序权重 */
  order: number;

  /** 是否启用 */
  enabled: boolean;
}
```

### 3. User（用户）- 可选

如果需要用户系统，可以定义用户模型。

```typescript
// src/types/user.ts

/**
 * 用户数据模型
 */
export interface User {
  /** 用户 ID */
  id: string;

  /** 用户名 */
  username: string;

  /** 邮箱 */
  email: string;

  /** 头像 */
  avatar?: string;

  /** 创建时间 */
  createdAt: string;

  /** 更新时间 */
  updatedAt: string;
}

/**
 * 用户偏好设置
 */
export interface UserPreferences {
  /** 用户 ID */
  userId: string;

  /** 主题 */
  theme: 'light' | 'dark' | 'auto';

  /** 默认分类 */
  defaultCategory?: CategoryType;

  /** 收藏的集成 ID 列表 */
  favorites: string[];

  /** 自定义集成列表 */
  customIntegrations: Integration[];
}
```

## 阶段一：静态 JSON 数据

### 数据文件结构

```
src/data/
├── integrations.json    # 集成工具数据
├── categories.json      # 分类数据
└── config.json          # 全局配置
```

### integrations.json

```json
{
  "integrations": [
    {
      "id": "sanity",
      "name": "Sanity",
      "description": "Real-time collaboration platform for structured content",
      "icon": "/icons/sanity.svg",
      "url": "https://www.sanity.io",
      "category": "devtools",
      "featured": true,
      "tags": ["cms", "content", "collaboration"],
      "backgroundColor": "#f03e2f",
      "createdAt": "2026-01-22T00:00:00Z",
      "updatedAt": "2026-01-22T00:00:00Z",
      "order": 100,
      "enabled": true
    },
    {
      "id": "buildkite",
      "name": "Buildkite",
      "description": "Buildkite is an open-source platform for running fast, secure, and scalable continuous integration pipelines",
      "icon": "/icons/buildkite.svg",
      "url": "https://buildkite.com",
      "category": "devtools",
      "featured": true,
      "tags": ["ci", "cd", "pipeline"],
      "backgroundColor": "#14cc80",
      "createdAt": "2026-01-22T00:00:00Z",
      "updatedAt": "2026-01-22T00:00:00Z",
      "order": 99,
      "enabled": true
    },
    {
      "id": "dato-cms",
      "name": "Dato CMS",
      "description": "Your Secure, Powerful Content Hub for Limitless Growth",
      "icon": "/icons/dato-cms.svg",
      "url": "https://www.datocms.com",
      "category": "devtools",
      "featured": true,
      "tags": ["cms", "content", "headless"],
      "backgroundColor": "#ff6b6b",
      "createdAt": "2026-01-22T00:00:00Z",
      "updatedAt": "2026-01-22T00:00:00Z",
      "order": 98,
      "enabled": true
    },
    {
      "id": "tiny-bird",
      "name": "Tiny Bird",
      "description": "Tinybird is a serverless real-time analytics platform for developers",
      "icon": "/icons/tiny-bird.svg",
      "url": "https://www.tinybird.co",
      "category": "devtools",
      "featured": true,
      "tags": ["analytics", "real-time", "data"],
      "backgroundColor": "#00d4ff",
      "createdAt": "2026-01-22T00:00:00Z",
      "updatedAt": "2026-01-22T00:00:00Z",
      "order": 97,
      "enabled": true
    },
    {
      "id": "mailchimp",
      "name": "Mailchimp",
      "description": "Grow your business with all-in-one marketing and automation",
      "icon": "/icons/mailchimp.svg",
      "url": "https://mailchimp.com",
      "category": "productivity",
      "featured": false,
      "tags": ["email", "marketing", "automation"],
      "backgroundColor": "#ffe01b",
      "createdAt": "2026-01-22T00:00:00Z",
      "updatedAt": "2026-01-22T00:00:00Z",
      "order": 50,
      "enabled": true
    },
    {
      "id": "slack",
      "name": "Slack",
      "description": "Slack is a new way to communicate with your team. It's faster, better organized, and more secure than email.",
      "icon": "/icons/slack.svg",
      "url": "https://slack.com",
      "category": "messaging",
      "featured": false,
      "tags": ["chat", "collaboration", "team"],
      "backgroundColor": "#4a154b",
      "createdAt": "2026-01-22T00:00:00Z",
      "updatedAt": "2026-01-22T00:00:00Z",
      "order": 90,
      "enabled": true
    }
  ]
}
```

### categories.json

```json
{
  "categories": [
    {
      "id": "all",
      "name": "All integrations",
      "description": "View all available integrations",
      "icon": "grid",
      "order": 0,
      "enabled": true
    },
    {
      "id": "devtools",
      "name": "DevTools",
      "description": "Development tools and platforms",
      "icon": "code",
      "order": 1,
      "enabled": true
    },
    {
      "id": "messaging",
      "name": "Messaging",
      "description": "Communication and messaging platforms",
      "icon": "message-circle",
      "order": 2,
      "enabled": true
    },
    {
      "id": "monitoring",
      "name": "Monitoring",
      "description": "Monitoring and observability tools",
      "icon": "activity",
      "order": 3,
      "enabled": true
    },
    {
      "id": "productivity",
      "name": "Productivity",
      "description": "Productivity and collaboration tools",
      "icon": "zap",
      "order": 4,
      "enabled": true
    },
    {
      "id": "security",
      "name": "Security",
      "description": "Security and compliance tools",
      "icon": "shield",
      "order": 5,
      "enabled": true
    },
    {
      "id": "searching",
      "name": "Searching",
      "description": "Search and discovery tools",
      "icon": "search",
      "order": 6,
      "enabled": true
    }
  ]
}
```

### config.json

```json
{
  "app": {
    "name": "Navly",
    "description": "Modern navigation hub for your favorite tools",
    "version": "1.0.0"
  },
  "features": {
    "search": true,
    "filter": true,
    "favorites": false,
    "customIntegrations": false
  },
  "ui": {
    "theme": "light",
    "itemsPerPage": 12,
    "featuredItemsCount": 4
  }
}
```

## 阶段二：云数据库方案

### 推荐方案：Supabase

Supabase 是一个开源的 Firebase 替代品，提供：

- PostgreSQL 数据库
- 实时订阅
- 认证系统
- 存储服务
- 免费额度充足

### 数据库表结构

#### 1. integrations 表

```sql
-- 集成工具表
CREATE TABLE integrations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  icon VARCHAR(500),
  url VARCHAR(500) NOT NULL,
  category VARCHAR(50) NOT NULL,
  featured BOOLEAN DEFAULT false,
  tags TEXT[], -- PostgreSQL 数组类型
  background_color VARCHAR(20),
  order_weight INTEGER DEFAULT 0,
  enabled BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建索引
CREATE INDEX idx_integrations_category ON integrations(category);
CREATE INDEX idx_integrations_featured ON integrations(featured);
CREATE INDEX idx_integrations_enabled ON integrations(enabled);
CREATE INDEX idx_integrations_order ON integrations(order_weight DESC);

-- 创建全文搜索索引
CREATE INDEX idx_integrations_search ON integrations USING GIN(to_tsvector('english', name || ' ' || description));
```

#### 2. categories 表

```sql
-- 分类表
CREATE TABLE categories (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  icon VARCHAR(100),
  order_weight INTEGER DEFAULT 0,
  enabled BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建索引
CREATE INDEX idx_categories_order ON categories(order_weight);
```

#### 3. users 表（可选）

```sql
-- 用户表
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  username VARCHAR(100) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  avatar VARCHAR(500),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### 4. user_preferences 表（可选）

```sql
-- 用户偏好设置表
CREATE TABLE user_preferences (
  user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  theme VARCHAR(20) DEFAULT 'light',
  default_category VARCHAR(50),
  favorites UUID[], -- 收藏的集成 ID 数组
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### 5. custom_integrations 表（可选）

```sql
-- 用户自定义集成表
CREATE TABLE custom_integrations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  icon VARCHAR(500),
  url VARCHAR(500) NOT NULL,
  category VARCHAR(50) NOT NULL,
  tags TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建索引
CREATE INDEX idx_custom_integrations_user ON custom_integrations(user_id);
```

### 数据库触发器

```sql
-- 自动更新 updated_at 字段
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 为所有表添加触发器
CREATE TRIGGER update_integrations_updated_at
  BEFORE UPDATE ON integrations
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_categories_updated_at
  BEFORE UPDATE ON categories
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

### Row Level Security (RLS) 策略

```sql
-- 启用 RLS
ALTER TABLE integrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

-- 公开读取策略
CREATE POLICY "Allow public read access"
  ON integrations
  FOR SELECT
  USING (enabled = true);

CREATE POLICY "Allow public read access"
  ON categories
  FOR SELECT
  USING (enabled = true);

-- 管理员写入策略（需要配合认证系统）
CREATE POLICY "Allow admin write access"
  ON integrations
  FOR ALL
  USING (auth.jwt() ->> 'role' = 'admin');
```

## API 接口设计

### RESTful API 端点

#### 集成工具相关

```typescript
// GET /api/integrations - 获取所有集成
interface GetIntegrationsQuery {
  category?: CategoryType;
  featured?: boolean;
  search?: string;
  page?: number;
  limit?: number;
}

interface GetIntegrationsResponse {
  data: Integration[];
  total: number;
  page: number;
  limit: number;
}

// GET /api/integrations/:id - 获取单个集成
interface GetIntegrationResponse {
  data: Integration;
}

// POST /api/integrations - 创建集成（需要认证）
interface CreateIntegrationRequest {
  body: CreateIntegrationDto;
}

interface CreateIntegrationResponse {
  data: Integration;
}

// PUT /api/integrations/:id - 更新集成（需要认证）
interface UpdateIntegrationRequest {
  body: UpdateIntegrationDto;
}

interface UpdateIntegrationResponse {
  data: Integration;
}

// DELETE /api/integrations/:id - 删除集成（需要认证）
interface DeleteIntegrationResponse {
  success: boolean;
}
```

#### 分类相关

```typescript
// GET /api/categories - 获取所有分类
interface GetCategoriesResponse {
  data: Category[];
}

// GET /api/categories/:id - 获取单个分类
interface GetCategoryResponse {
  data: Category;
}
```

### Supabase 客户端示例

```typescript
// src/services/supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// src/services/integrations.ts
import { supabase } from './supabase';
import type { Integration, CreateIntegrationDto } from '@/types';

/**
 * 获取所有集成
 */
export const fetchIntegrations = async (params?: {
  category?: string;
  featured?: boolean;
  search?: string;
}): Promise<Integration[]> => {
  let query = supabase
    .from('integrations')
    .select('*')
    .eq('enabled', true)
    .order('order_weight', { ascending: false });

  if (params?.category && params.category !== 'all') {
    query = query.eq('category', params.category);
  }

  if (params?.featured !== undefined) {
    query = query.eq('featured', params.featured);
  }

  if (params?.search) {
    query = query.or(`name.ilike.%${params.search}%,description.ilike.%${params.search}%`);
  }

  const { data, error } = await query;

  if (error) throw error;
  return data || [];
};

/**
 * 获取单个集成
 */
export const fetchIntegrationById = async (id: string): Promise<Integration | null> => {
  const { data, error } = await supabase.from('integrations').select('*').eq('id', id).single();

  if (error) throw error;
  return data;
};

/**
 * 创建集成
 */
export const createIntegration = async (dto: CreateIntegrationDto): Promise<Integration> => {
  const { data, error } = await supabase.from('integrations').insert([dto]).select().single();

  if (error) throw error;
  return data;
};

/**
 * 更新集成
 */
export const updateIntegration = async (
  id: string,
  dto: Partial<CreateIntegrationDto>
): Promise<Integration> => {
  const { data, error } = await supabase
    .from('integrations')
    .update(dto)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

/**
 * 删除集成
 */
export const deleteIntegration = async (id: string): Promise<void> => {
  const { error } = await supabase.from('integrations').delete().eq('id', id);

  if (error) throw error;
};
```

## 数据迁移方案

### 从静态 JSON 迁移到 Supabase

```typescript
// scripts/migrate-to-supabase.ts
import { supabase } from '../src/services/supabase';
import integrationsData from '../src/data/integrations.json';
import categoriesData from '../src/data/categories.json';

async function migrateData() {
  console.log('Starting data migration...');

  // 1. 迁移分类
  console.log('Migrating categories...');
  const { error: categoriesError } = await supabase
    .from('categories')
    .insert(categoriesData.categories);

  if (categoriesError) {
    console.error('Error migrating categories:', categoriesError);
    return;
  }

  // 2. 迁移集成
  console.log('Migrating integrations...');
  const { error: integrationsError } = await supabase
    .from('integrations')
    .insert(integrationsData.integrations);

  if (integrationsError) {
    console.error('Error migrating integrations:', integrationsError);
    return;
  }

  console.log('Migration completed successfully!');
}

migrateData();
```

## 数据验证

### Zod Schema 验证

```typescript
// src/schemas/integration.ts
import { z } from 'zod';

export const integrationSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).max(255),
  description: z.string().max(1000),
  icon: z.string().url(),
  url: z.string().url(),
  category: z.enum([
    'all',
    'devtools',
    'messaging',
    'monitoring',
    'productivity',
    'security',
    'searching',
  ]),
  featured: z.boolean(),
  tags: z.array(z.string()),
  backgroundColor: z.string().optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  order: z.number().optional(),
  enabled: z.boolean(),
});

export const createIntegrationSchema = integrationSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
```

## 最佳实践

1. **数据一致性**：使用 TypeScript 类型确保前后端数据一致
2. **性能优化**：合理使用索引和缓存
3. **安全性**：使用 RLS 策略保护数据
4. **可扩展性**：设计灵活的数据结构，便于未来扩展
5. **数据验证**：使用 Zod 等库进行数据验证

---

**文档版本**: v1.0
**最后更新**: 2026-01-22
**维护者**: thornboo
