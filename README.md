# Zhxin Web（隆隆是我）

基于 **React 19 + Vite 7 + TypeScript + Supabase** 的个人博客站点。暖色编辑风 UI、左侧导航布局，支持桌面 / 平板 / 手机全端适配。文章数据对接 Supabase，与微信小程序共用同一个内容后台。

## 功能概览

| 模块 | 说明 |
|------|------|
| **首页** | Hero 标语、文章列表（Supabase 分页加载、骨架屏、本地缓存、搜索过滤） |
| **归档** | 站点运行时长统计 + Supabase 相册（分页加载、懒加载） |
| **推荐工具** | 对接 Supabase tools 表，搜索 / 访问 / 复制链接 |
| **我的** | 联系方式、抖音二维码、宣传视频弹窗 |
| **其他** | Root 教程入口、图片圆角处理工具 |
| **文章详情** | 按需从 Supabase 获取全文，Markdown 渲染 |
| **主题** | 浅色 / 深色，默认跟随系统偏好 |

## 技术栈

- React 19、TypeScript、Vite 7
- @supabase/supabase-js（数据存储）
- Framer Motion（页面过渡）
- Lucide React（图标）
- react-markdown（文章渲染）
- 原生 Canvas（图片圆角导出，纯前端处理）

## 快速开始

```bash
# 安装依赖
npm install

# 配置环境变量（复制后填入你的 Supabase 项目信息）
cp .env.example .env
# VITE_SUPABASE_URL=https://your-project.supabase.co
# VITE_SUPABASE_ANON_KEY=your-anon-key

# 本地开发（默认 http://localhost:5173）
npm run dev

# 生产构建
npm run build

# 预览构建结果
npm run preview
```

> Supabase 环境变量为公开的 anon key（通过 RLS 策略保护数据安全），可安全提交到公开仓库。**service_role 密钥严禁出现在前端代码中。**

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
│   │   ├── usePosts.ts     # 文章加载（Supabase + 分页 + 缓存）
│   │   └── useMediaQuery.ts
│   │
│   ├── services/           # Supabase 数据服务层
│   │   ├── articleService.ts  # 文章查询（列表 / 详情 / 搜索）
│   │   ├── albumService.ts    # 相册查询（分页）
│   │   └── toolService.ts     # 工具推荐查询
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
│   │   ├── ArchivesView.tsx    # 运行统计 + 相册
│   │   ├── FriendlyLinksView.tsx / LinkCard.tsx  # 推荐工具
│   │   ├── Toast.tsx       # 全局提示
│   │   ├── MyView.tsx
│   │   ├── OthersView.tsx
│   │   ├── ImageRoundTool.tsx   # 图片圆角工具
│   │   └── RootTutorial/        # Root 教程子组件
│   │
│   ├── pages/              # 独立教程页（拉闸 / 隐藏环境）
│   ├── posts/              # 博客 Markdown（本地静态，预留回退）
│   ├── kernel_Article/     # 内核相关 Markdown 文稿（参考用）
│   ├── data/
│   │   └── rootTutorialData.ts
│   └── utils/
│       ├── markdown.ts     # 文章类型定义
│       ├── supabase.ts     # Supabase 客户端（含安全降级）
│       └── imageRound.ts   # 圆角处理核心逻辑
│
├── index.html
├── vite.config.ts
├── vercel.json
└── package.json
```

## 数据架构

所有内容数据存储在 **Supabase**，与微信小程序（`zhxin_wechat/`）和管理后台（`admin/`）共用同一项目：

| 表 | 内容 | API |
|---|------|-----|
| `articles` | 博客文章（含 published 发布控制） | Supabase REST + RLS |
| `album_images` | 相册图片 | Supabase REST + RLS |
| `tools` | 推荐工具 | Supabase REST + RLS |

前端使用 Supabase anon key + **RLS 策略**控制访问权限：公开可读已发布内容，写入需登录认证。

## 布局说明

- **≥768px（桌面 / 平板）**：左侧固定 `SiteSidebar`（品牌、导航；首页额外显示资料与站点统计），右侧 `TopBar` + 主内容。
- **<768px（手机）**：顶部 `TopBar`、底部 `MobileNav`，首页通过 `HomePanel` 展示资料与统计。
- 视图切换由 `AppProvider` 管理（`home` / `archives` / `friendly-links` / `profile` / `others` / `post-detail` / `article-detail`），无 URL 路由库，刷新后回到首页。

响应式断点统一为 **767px**、**1024px**，样式变量定义在 `src/styles/tokens.css`。

## 功能细节

### 文章列表（首页）
- 分页加载（每页 10 篇），底部"加载更多"
- 骨架屏（3 张闪烁卡片）首屏展示
- localStorage 缓存（5 分钟 TTL），有缓存时秒开 + 后台静默刷新
- 客户端搜索过滤（标题 / 摘要 / 标签）

### 文章详情
- 按需获取全文（列表查询不拉取 content 字段）
- 骨架屏加载态
- 阅读量计数（通过 Supabase RPC `increment_article_views`）

### 相册（归档页）
- 分页加载（每页 5 张），底部"加载更多"
- 骨架占位方块 + 懒加载
- localStorage 缓存（30 分钟 TTL）

### 推荐工具
- 从 Supabase `tools` 表获取，按 sort_order 排序
- 搜索过滤 + 复制链接 Toast 提示
- localStorage 缓存（30 分钟 TTL）

## 开发说明

- **新增页面视图**：在 `ContentRouter.tsx` 增加 `case`，并在 `appContext.ts` 的 `AppView` 类型、`SiteSidebar` / `MobileNav` 导航项中注册。
- **主题变量**：优先改 `tokens.css`，组件样式通过 CSS 变量继承。
- **类型检查**：`npx tsc -p tsconfig.app.json --noEmit`
- 构建产物输出到 `dist/`，不含 gzip 预压缩（Vercel 等平台自动处理）

## 许可证

私有个人项目，未指定开源协议时默认保留所有权利。
