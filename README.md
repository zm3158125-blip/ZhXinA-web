# Zhxin Web (隆隆是我)

这是一个基于 React + Vite + TypeScript 构建的个人网站/博客项目。采用 Glassmorphism (毛玻璃) 风格设计，集成了博客文章、友链展示等功能。

## 项目结构 (Project Structure)

### `src/` - 源代码目录

- **`components/`** - UI 组件
  - `Header.tsx`: 顶部导航栏，包含主题切换（日/夜模式）、搜索框和导航链接。
  - `Layout.tsx`: 主布局组件，处理路由视图切换和页面过渡动画。
  - `PostList.tsx`: 首页文章列表，展示文章摘要（Markdown 渲染，限制 3 行）。
  - `PostDetail.tsx`: 文章详情页，展示完整的 Markdown 渲染内容。
  - `Hero.tsx`: 首页顶部的 Hero 区域（标语/简介）。
  - `Sidebar.tsx`: 侧边栏，通常包含个人信息或小工具。
  - `FriendlyLinksView.tsx`: 友链展示页面，包含分类过滤和搜索功能。
  - `ArchivesView.tsx`: 归档页面（待完善）。
  - `OthersView.tsx`: 其他页面（待完善）。
  - `LinkCard.tsx`: 友链卡片组件。

- **`posts/`** - 博客文章 Markdown 文件
  - 存放所有的 `.md` 文章文件。文件名即为 URL slug。
  - 文件头部需包含 yaml frontmatter (标题、日期、标签等)。

- **`utils/`** - 工具函数
  - `markdown.ts`: 用于读取和解析 `posts/` 目录下所有 Markdown 文件的核心逻辑。

- **`data/`** - 静态数据
  - `friendLinks.ts`: 友链数据配置文件。

### `public/` - 静态资源
存放图片、图标 (SVG) 等不需要编译的静态文件。

## 使用说明 (How to Use)

### 1. 添加博客文章 (Adding Posts)
在 `src/posts/` 目录下创建一个新的 `.md` 文件，例如 `my-new-post.md`。
在文件开头添加配置信息：

```yaml
---
title: "我的新文章"
date: "2025-01-01"
tags: ["生活", "随笔"]
excerpt: "这是文章的简短摘要，会显示在首页列表..."
isPinned: false
---

# 正文标题

这里写正文内容，支持 Markdown 语法。
```

### 2. 添加友链 (Adding Friend Links)
编辑 `src/data/friendLinks.ts` 文件，在 `FRIEND_LINKS` 数组中添加新的对象：

```typescript
{
    id: 'unique-id',
    name: '网站名称',
    url: 'https://example.com',
    description: '网站描述',
    logo: '图标URL',
    category: 'Framework', // 需对应 CATEGORIES 中的 ID
}
```

### 3. 本地运行 (Run Locally)
```bash
npm install
npm run dev
```

### 4. 构建打包 (Build)
```bash
npm run build
```

## 技术栈 (Tech Stack)
- **React 18+**
- **TypeScript**
- **Vite**
- **Framer Motion** (动画)
- **Lucide React** (图标)
- **React Markdown** (Markdown 渲染)
