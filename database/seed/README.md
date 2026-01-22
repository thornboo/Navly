# 演示数据 (Demo Data)

本目录包含用于演示和开发的示例数据。

## 文件说明

### demo-data.sql
初始种子数据，包含：
- **7 个分类**：DevTools、Messaging、Monitoring、Productivity、Security、Searching 等
- **16 个集成示例**：Sanity、GitHub、Slack、ChatGPT、Stripe 等真实工具

用途：
- 快速启动应用并展示功能
- 提供数据结构参考
- 开发和测试基础数据

### update-icons.sql
将图标字段从路径格式（`/icons/github.svg`）更新为品牌标识符（`github`），以配合 `simple-icons` 库使用。

## 使用方法

### 方式一：通过 Supabase Dashboard
1. 登录 Supabase Dashboard
2. 进入 SQL Editor
3. 复制并执行 `demo-data.sql` 内容
4. （可选）执行 `update-icons.sql` 更新图标格式

### 方式二：通过 Supabase CLI
```bash
# 确保已安装 Supabase CLI
supabase db reset --db-url "your-database-url"

# 或者直接执行 SQL 文件
psql "your-database-url" < database/seed/demo-data.sql
psql "your-database-url" < database/seed/update-icons.sql
```

## 自定义数据

这些是演示数据，您可以：
- ✅ 保留作为示例参考
- ✅ 修改为您自己的工具和资源
- ✅ 扩展添加更多集成
- ✅ 完全替换为生产数据

## 数据结构

### categories 表
```sql
- id: 分类唯一标识
- name: 分类名称
- description: 分类描述
- icon: 图标名称（Lucide 图标）
- order_weight: 排序权重
- enabled: 是否启用
```

### integrations 表
```sql
- id: 集成唯一标识
- name: 集成名称
- description: 集成描述
- icon: 图标标识符（simple-icons 品牌名）
- url: 集成链接
- category: 所属分类
- featured: 是否精选
- tags: 标签数组
- background_color: 品牌背景色
- order_weight: 排序权重
- enabled: 是否启用
```
