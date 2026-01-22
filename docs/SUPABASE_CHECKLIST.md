# 🚀 Supabase 集成操作清单

## ✅ 已完成的准备工作

我已经为你完成了以下工作：

1. ✅ 创建了 Supabase 客户端配置 (`lib/supabase.ts`)
2. ✅ 更新了数据加载逻辑支持 Supabase (`lib/data.ts`)
3. ✅ 更新了主页面支持异步数据加载 (`app/page.tsx`)
4. ✅ 创建了演示数据 SQL 脚本 (`database/seed/demo-data.sql`)
5. ✅ 创建了详细的 Supabase 设置指南 (`docs/SUPABASE_SETUP.md`)

## 📋 你需要执行的步骤

### 步骤 1：安装依赖包 ⏳

```bash
pnpm add clsx tailwind-merge @supabase/supabase-js
```

**执行完成后告诉我，我会继续指导下一步。**

---

### 步骤 2：创建 Supabase 项目

1. 访问 https://supabase.com
2. 使用 GitHub 账号登录
3. 点击 "New Project"
4. 填写项目信息：
   - **Name**: navly
   - **Database Password**: 设置一个强密码（记住它！）
   - **Region**: Northeast Asia (Tokyo)
   - **Plan**: Free
5. 等待项目创建完成（1-2分钟）

### 步骤 3：获取 API 凭证

1. 进入项目后，点击左侧 "Settings" → "API"
2. 复制以下信息：
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon public key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

### 步骤 4：配置环境变量

在项目根目录创建 `.env.local` 文件：

```env
NEXT_PUBLIC_SUPABASE_URL=你的Project_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=你的anon_public_key
```

### 步骤 5：创建数据库表

1. 在 Supabase 项目中，点击左侧 "SQL Editor"
2. 点击 "New query"
3. 打开项目中的 `docs/SUPABASE_SETUP.md` 文件
4. 复制其中的 SQL 脚本（创建表的部分）
5. 粘贴到 SQL Editor 并点击 "Run"
6. 确认执行成功

### 步骤 6：导入初始数据

1. 在 SQL Editor 中新建一个查询
2. 打开项目中的 `database/seed/demo-data.sql` 文件
3. 复制全部内容
4. 粘贴到 SQL Editor 并点击 "Run"
5. 确认数据导入成功

### 步骤 7：验证数据

1. 点击左侧 "Table Editor"
2. 查看 `categories` 表，应该有 7 条记录
3. 查看 `integrations` 表，应该有 16 条记录

### 步骤 8：启动项目

```bash
pnpm dev
```

访问 http://localhost:3000，应该能看到从 Supabase 加载的数据！

## 🎯 当前状态

- ✅ 代码已准备就绪
- ⏳ 等待你安装依赖包
- ⏳ 等待你创建 Supabase 项目
- ⏳ 等待你配置环境变量
- ⏳ 等待你创建数据库表
- ⏳ 等待你导入数据

## 📚 参考文档

- 详细设置指南：`docs/SUPABASE_SETUP.md`
- 演示数据脚本：`database/seed/demo-data.sql`

## ❓ 遇到问题？

如果遇到任何问题，随时告诉我：

- 依赖安装失败
- Supabase 项目创建问题
- SQL 执行错误
- 数据加载失败
- 其他任何问题

---

**现在请先执行步骤 1：安装依赖包，然后告诉我完成了！** 🚀
