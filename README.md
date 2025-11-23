# 山东东方高校联合会 (SDTCU) 官网
本项目大部分由Google Gemini 3 Pro构建，省了很多力。

山东东方高校联合会（Shandong Touhou College Union）官方网站源代码。

## 🛠️ 技术栈

本项目基于现代前端技术栈构建：

- **框架**: [Vue 3](https://vuejs.org/) (Composition API)
- **语言**: [TypeScript](https://www.typescriptlang.org/)
- **构建工具**: [Vite](https://vitejs.dev/)
- **样式**: [Tailwind CSS](https://tailwindcss.com/)
- **图片处理**: [Sharp](https://sharp.pixelplumbing.com/) (用于构建前图片优化)

## ✨ 主要功能

- **高校社团展示**: 收录山东省内各大高校东方社群信息，展示各高校东方校徽。
- **活动资讯**: 实时更新省内东方Project相关展会（THO/THP）及聚会动态，状态可视化（筹备中/售票中/进行中）。
- **季节特效**: 首页包含随季节变化的动态视觉效果（如樱花飘落等）。
- **响应式设计**: 完美适配桌面端与移动端访问。
- **暗色模式**: 支持系统级深色模式适配。

## 🚀 快速开始

### 环境要求

- Node.js (推荐 v16+)
- npm 或 yarn/pnpm

### 安装依赖

```bash
npm install
```

### 开发环境运行

```bash
npm run dev
```

### 构建生产版本

```bash
npm run build
```

构建产物将输出至 `dist` 目录。

## 📁 项目结构

```
├── public/              # 静态资源 (Logo, 海报等)
├── scripts/             # 工具脚本
│   └── optimize-images.js # 图片 WebP 转换与压缩脚本
├── src/
│   ├── components/      # Vue 组件 (社团列表, 活动列表, 季节特效等)
│   ├── utils/           # 工具函数
│   ├── App.vue          # 根组件 (包含 Hero Section 和 Join Us Section)
│   └── main.ts          # 入口文件
├── index.html           # HTML 模板
└── ...配置文件
```

## 🎨 图片优化

本项目包含一个自动化的图片优化脚本，用于将 `public` 目录下的图片转换为 WebP 格式以提升加载速度。

运行方式：

```bash
node scripts/optimize-images.js
```

## 🤝 参与贡献

欢迎提交 Issue 或 Pull Request 来完善网站内容！

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 提交 Pull Request

## 🔗 联系我们

- **官方 QQ 群**: 977015593
- **GitHub**: [SDTCU](https://github.com/SDTCU)

---
© 2025 山东东方高校联合会
