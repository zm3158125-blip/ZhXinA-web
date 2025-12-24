/**
 * Friend Links Data Configuration
 * 
 * How to add a new friend link:
 * 1. Add a new object to the `FRIEND_LINKS` array.
 * 2. Ensure each link has a unique 'id'.
 * 3. 'category' must match one of the IDs in the `CATEGORIES` array.
 * 4. 'logo' should be a URL to the website's favicon or logo image.
 * 
 * How to add a new category:
 * 1. Add a new object to the `CATEGORIES` array with 'id' and 'label'.
 */
export interface FriendLink {
    id: string;
    name: string;
    url: string;
    description: string;
    logo: string;
    category: string;
    tags?: string[];
}

export const CATEGORIES = [
    { id: 'all', label: '全部' },
    { id: 'Framework', label: 'Framework' },
    { id: 'CloudServiceArea', label: 'CloudServiceArea' },
    { id: 'WebHostingPlatform', label: 'WebHostingPlatform' },
    { id: 'FileConverter', label: 'FileConverter' },
    { id: 'AI', label: 'AI' },
    { id: 'Game', label: 'Game' },
    { id: 'Minecraft', label: 'Minecraft' },
    { id: 'Call Of Duty', label: 'Call Of Duty' },
    { id: 'WZ', label: 'WZ' },
    { id: 'Tool', label: 'Tool' },
    { id: 'Anime', label: 'Anime' },
    { id: 'Wallpaper', label: 'Wallpaper' },
];

export const FRIEND_LINKS: FriendLink[] = [
    {
        id: '1',
        name: 'Astro',
        url: 'https://astro.build',
        description: '内容驱动型网站的 Web 框架。⭐️ Star to support our work!',
        logo: 'https://astro.build/favicon.svg', // Placeholder, user should update
        category: 'Framework',
    },
    {
        id: '2',
        name: 'AkileCloud',
        url: 'https://akile.io',
        description: '云服务器',
        logo: 'https://akile.io/favicon.ico',
        category: 'CloudServiceArea',
    },
    {
        id: '3',
        name: 'Vercel',
        url: 'https://vercel.com',
        description: '静态网站托管平台',
        logo: 'https://assets.vercel.com/image/upload/q_auto/front/favicon/vercel/favicon.ico',
        category: 'WebHostingPlatform',
    },
    {
        id: '4',
        name: 'Netlify',
        url: 'https://netlify.com',
        description: '静态网站托管平台',
        logo: 'https://www.netlify.com/favicon.ico',
        category: 'WebHostingPlatform',
    },
    {
        id: '5',
        name: 'Convertio',
        url: 'https://convertio.co',
        description: '在线文件转换器',
        logo: 'https://convertio.co/favicon.ico',
        category: 'FileConverter',
    },
    {
        id: '6',
        name: 'Chat-GPT',
        url: 'https://chat.openai.com',
        description: '一款好用的AI工具',
        logo: 'https://chat.openai.com/favicon.ico',
        category: 'AI',
    },
    {
        id: '7',
        name: 'deepseek',
        url: 'https://ai.cn',
        description: '一款好用的ai工具',
        logo: 'https://cdn.deepseek.com/chat/icon.png',
        category: 'AI',
    }
];
