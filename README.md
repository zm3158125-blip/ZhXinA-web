# Zhxin Web（隆隆是我）

基于 **React 19 + Vite 7 + TypeScript** 的个人博客站点。采用暖色编辑风 UI、左侧导航布局，支持桌面 / 平板 / 手机全端适配。文章、友链、教程等数据均在本地配置，无后端依赖。

## 功能概览

| 模块 | 说明 |
|------|------|
| **首页** | Hero 标语、文章列表（搜索过滤、置顶、Markdown 摘要） |
| **归档** | 站点上线时间与运行时长统计 |
| **友链** | 分类筛选、关键词搜索、访问 / 复制链接 |
| **我的** | 联系方式、抖音二维码、宣传视频弹窗 |
| **其他** | 教程入口、Root 入门引导、**图片圆角处理工具** |
| **文章详情** | 完整 Markdown 渲染 |
| **主题** | 浅色 / 深色，默认跟随系统偏好 |

## 技术栈

- React 19、TypeScript、Vite 7
- Framer Motion（页面过渡）
- Lucide React（图标）
- react-markdown + front-matter（文章解析）
- 原生 Canvas（图片圆角导出，纯前端处理）

## 快速开始

```bash
# 安装依赖
npm install

# 本地开发（默认 http://localhost:5173）
npm run dev

# 生产构建（输出 dist/，含 gzip 压缩）
npm run build

# 预览构建结果
npm run preview

# 代码检查
npm run lint
```

## 项目结构

```
zhxin-web/
├── public/                 # 静态资源（logo、图标、视频等）
├── src/
│   ├── App.tsx             # 根组件，挂载 AppProvider
│   ├── main.tsx
│   ├── index.css           # 全局样式入口
│   │
│   ├── layout/             # 布局与路由渲染
│   │   ├── AppShell.tsx    # 侧栏 + 顶栏 + 主内容区
│   │   └── ContentRouter.tsx  # 视图切换（懒加载各页面）
│   │
│   ├── context/
│   │   ├── appContext.ts   # 导航 / 搜索等类型与 Context
│   │   └── AppProvider.tsx # 全局状态
│   │
│   ├── hooks/
│   │   ├── useApp.ts       # 读取导航上下文
│   │   ├── useTheme.ts     # 主题切换
│   │   ├── usePosts.ts     # 文章加载与搜索过滤
│   │   └── useMediaQuery.ts
│   │
│   ├── styles/             # 设计系统
│   │   ├── tokens.css      # 颜色、间距、断点变量
│   │   ├── layout.css      # 栅格与侧栏布局
│   │   └── components.css  # 卡片、按钮等通用样式
│   │
│   ├── components/         # UI 组件
│   │   ├── SiteSidebar.tsx # 桌面端左侧导航 + 资料 + 统计
│   │   ├── MobileNav.tsx   # 移动端底部导航
│   │   ├── TopBar.tsx      # 顶栏（标题、搜索、主题）
│   │   ├── Hero.tsx
│   │   ├── HomePanel.tsx   # 移动端首页资料 / 统计条
│   │   ├── PostList.tsx / PostDetail.tsx
│   │   ├── ArchivesView.tsx
│   │   ├── FriendlyLinksView.tsx / LinkCard.tsx
│   │   ├── MyView.tsx
│   │   ├── OthersView.tsx
│   │   ├── ImageRoundTool.tsx   # 图片圆角工具
│   │   └── RootTutorial/        # Root 教程子组件
│   │
│   ├── pages/              # 独立教程页（拉闸 / 隐藏环境）
│   ├── posts/              # 博客 Markdown（自动扫描）
│   ├── kernel_Article/     # 内核相关 Markdown 文稿（参考用）
│   ├── data/
│   │   ├── friendLinks.ts
│   │   └── rootTutorialData.ts
│   └── utils/
│       ├── markdown.ts     # 文章解析
│       └── imageRound.ts     # 圆角处理核心逻辑
│
├── index.html
├── vite.config.ts
└── package.json
```

## 布局说明

- **≥768px（桌面 / 平板）**：左侧固定 `SiteSidebar`（品牌、导航；首页额外显示资料与站点统计），右侧 `TopBar` + 主内容。
- **&lt;768px（手机）**：顶部 `TopBar`、底部 `MobileNav`，首页通过 `HomePanel` 展示资料与统计。
- 视图切换由 `AppProvider` 管理（`home` / `archives` / `friendly-links` / `profile` / `others` / `post-detail` / `article-detail`），无 URL 路由库，刷新后回到首页。

响应式断点统一为 **767px**、**1024px**，样式变量定义在 `src/styles/tokens.css`。

## 使用指南

### 添加博客文章

在 `src/posts/` 新建 `xxx.md`，文件头部使用 YAML frontmatter：

```yaml
---
title: "文章标题"
date: "2026-01-01"
tags: ["标签1", "标签2"]
excerpt: "列表页显示的摘要，建议一两句话。"
isPinned: false
---

正文支持标准 Markdown。
```

保存后开发服务器会自动热更新；`slug` 为文件名（不含 `.md`）。

### 添加友链

编辑 `src/data/friendLinks.ts`，向 `FRIEND_LINKS` 追加条目，`category` 需为 `CATEGORIES` 中已存在的 `id`：

```typescript
{
  id: 'my-site',
  name: '示例站点',
  url: 'https://example.com',
  description: '一句话介绍',
  logo: '/path-or-url-to-logo.png',
  category: 'blog',
}
```

### 修改 Root 教程步骤

编辑 `src/data/rootTutorialData.ts` 中的 `TUTORIAL_STEPS` 数组。

### 图片圆角工具

路径：**其他 → 图片圆角处理工具**（组件 `ImageRoundTool`）。

| 能力 | 说明 |
|------|------|
| 圆角模式 | 统一半径，或四角独立调节 |
| 预设 | 直角 / 小 / 中 / 大 / 超大 / 圆形 |
| 背景 | 透明（PNG/WebP）或自定义纯色 |
| 内边距 | 0–80px |
| 边框 | 粗细与颜色 |
| 导出 | PNG / JPEG / WebP，可调画质与最大边长 |
| 隐私 | 全部在浏览器本地 Canvas 处理，不上传服务器 |

逻辑实现见 `src/utils/imageRound.ts`。

### 静态资源

- 图片、图标、视频等放在 `public/`，引用时使用根路径，例如 `/logo.png`。
- 避免使用 `/public/xxx` 形式（Vite 会以 `public` 为根目录映射）。

## 开发说明

- **新增页面视图**：在 `ContentRouter.tsx` 增加 `case`，并在 `appContext.ts` 的 `AppView` 类型、`SiteSidebar` / `MobileNav` 导航项中注册。
- **主题变量**：优先改 `tokens.css`，组件样式通过 CSS 变量继承。
- **类型检查**：`npx tsc -p tsconfig.app.json --noEmit`
- 构建使用 `vite-plugin-compression` 生成 `.gz` 静态资源，部署时需服务器配置对应 MIME 与回退规则（若启用预压缩）。

## 许可证

私有个人项目，未指定开源协议时默认保留所有权利。
