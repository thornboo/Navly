# Supabase 集成指南

## 步骤 1：创建 Supabase 项目

### 1.1 注册账号

1. 访问 https://supabase.com
2. 点击 "Start your project"
3. 使用 GitHub 账号登录（推荐）

### 1.2 创建新项目

1. 点击 "New Project"
2. 填写项目信息：
   - **Name**: navly（或你喜欢的名字）
   - **Database Password**: 设置一个强密码（保存好！）
   - **Region**: 选择 Northeast Asia (Tokyo) - 离中国最近
   - **Pricing Plan**: Free（免费版足够用）
3. 点击 "Create new project"
4. 等待 1-2 分钟项目初始化

### 1.3 获取 API 凭证

1. 项目创建完成后，进入项目
2. 点击左侧菜单 "Settings" → "API"
3. 找到以下信息并复制保存：
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon public key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`（很长的字符串）

## 步骤 2：创建数据库表

### 2.1 进入 SQL Editor

1. 点击左侧菜单 "SQL Editor"
2. 点击 "New query"

### 2.2 执行 SQL 脚本

复制以下 SQL 脚本并执行：

```sql
-- 创建 categories 表
CREATE TABLE categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  order_weight INTEGER DEFAULT 0,
  enabled BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建 integrations 表
CREATE TABLE integrations (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  url TEXT NOT NULL,
  category TEXT NOT NULL REFERENCES categories(id),
  featured BOOLEAN DEFAULT false,
  tags TEXT[],
  background_color TEXT,
  order_weight INTEGER DEFAULT 0,
  enabled BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建索引
CREATE INDEX idx_integrations_category ON integrations(category);
CREATE INDEX idx_integrations_featured ON integrations(featured);
CREATE INDEX idx_integrations_enabled ON integrations(enabled);
CREATE INDEX idx_categories_order ON categories(order_weight);

-- 启用 Row Level Security (RLS)
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE integrations ENABLE ROW LEVEL SECURITY;

-- 创建公开读取策略
CREATE POLICY "Allow public read access on categories"
  ON categories FOR SELECT
  USING (enabled = true);

CREATE POLICY "Allow public read access on integrations"
  ON integrations FOR SELECT
  USING (enabled = true);

-- 创建自动更新 updated_at 的函数
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 为表添加触发器
CREATE TRIGGER update_categories_updated_at
  BEFORE UPDATE ON categories
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_integrations_updated_at
  BEFORE UPDATE ON integrations
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

3. 点击 "Run" 执行脚本
4. 确认没有错误提示

### 2.3 验证表创建

1. 点击左侧菜单 "Table Editor"
2. 应该能看到 `categories` 和 `integrations` 两个表

## 步骤 3：配置环境变量

在项目根目录创建 `.env.local` 文件：

```env
NEXT_PUBLIC_SUPABASE_URL=你的项目URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=你的anon_key
```

**注意**：

- 替换为你在步骤 1.3 中复制的实际值
- `.env.local` 已在 `.gitignore` 中，不会被提交到 Git

## 步骤 4：导入初始数据

### 方式一：使用 SQL 脚本（推荐）

在 SQL Editor 中执行数据导入脚本（我会为你生成）

### 方式二：使用 Table Editor 手动添加

1. 进入 "Table Editor"
2. 选择表
3. 点击 "Insert row" 手动添加数据

## 完成！

配置完成后，运行 `pnpm dev` 启动项目，数据将从 Supabase 加载。

## 常见问题

### Q: 找不到 API 凭证？

A: Settings → API → Project URL 和 anon public key

### Q: SQL 执行报错？

A: 检查是否有语法错误，或者分段执行

### Q: 数据加载失败？

A: 检查环境变量是否正确配置，检查 RLS 策略是否启用

### Q: 免费版够用吗？

A: 免费版提供：

- 500MB 数据库存储
- 50,000 行数据
- 2GB 文件存储
- 对于个人导航网站完全足够
