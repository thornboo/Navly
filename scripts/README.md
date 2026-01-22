# 工具脚本 (Scripts)

本目录用于存放项目相关的工具脚本和自动化脚本。

## 目录说明

此目录应包含：
- ✅ 构建脚本
- ✅ 部署脚本
- ✅ 数据迁移脚本
- ✅ 代码生成脚本
- ✅ 开发辅助工具

## 注意事项

- ❌ 不要在此目录放置演示数据或种子数据
- ❌ 演示数据应放在 `database/seed/` 目录
- ✅ 所有脚本应有清晰的文档说明
- ✅ 脚本应具有可执行权限（`chmod +x`）

## 示例脚本

### 数据库迁移
```bash
# scripts/migrate-db.sh
#!/bin/bash
# 执行数据库迁移
```

### 代码生成
```bash
# scripts/generate-types.sh
#!/bin/bash
# 从数据库 schema 生成 TypeScript 类型
```

### 部署
```bash
# scripts/deploy.sh
#!/bin/bash
# 部署到生产环境
```
