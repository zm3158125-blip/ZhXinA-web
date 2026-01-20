
import frontMatter from 'front-matter';

export interface PostData {
    id: string;
    title: string;
    date: string;
    tags: string[];
    excerpt: string;
    content: string; // The raw markdown content
    wordCount: number;
    isPinned?: boolean;
    slug: string;
}

interface FrontMatterAttributes {
    title: string;
    date: string;
    tags: string[];
    excerpt: string;
    isPinned?: boolean;
}

export async function getAllPosts(): Promise<PostData[]> {
    const modules = import.meta.glob('../posts/*.md', { query: '?raw', import: 'default' });
    const posts: PostData[] = [];

    for (const path in modules) {
        const rawContent = (await modules[path]()) as string;
        const { attributes, body } = frontMatter<FrontMatterAttributes>(rawContent);
        const slug = path.split('/').pop()?.replace('.md', '') || '';

        // Simple word count estimation
        const wordCount = body.trim().split(/\s+/).length;

        posts.push({
            id: slug, // Use slug as ID
            slug,
            title: attributes.title || 'Untitled',
            date: attributes.date || new Date().toISOString().split('T')[0],
            tags: attributes.tags || [],
            excerpt: attributes.excerpt || body.slice(0, 100) + '...',
            content: body,
            wordCount,
            isPinned: attributes.isPinned,
        });
    }

    // Sort by date (newest first)
    // Also prioritize pinned posts
    return posts.sort((a, b) => {
        if (a.isPinned && !b.isPinned) return -1;
        if (!a.isPinned && b.isPinned) return 1;
        return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
}

export async function getKernelArticles(): Promise<PostData[]> {
    // Directly import the kernel articles files instead of using glob
    // This ensures the files are properly included in the build
    const articles: PostData[] = [];
    
    try {
        // Import each file directly
        const clearDataContent = await import('../kernel_Article/clear-data.md?raw');
        const hideEnvContent = await import('../kernel_Article/hide-env.md?raw');
        
        // Process clear-data.md
        const { attributes: clearDataAttrs, body: clearDataBody } = frontMatter<FrontMatterAttributes>(clearDataContent.default);
        articles.push({
            id: 'clear-data',
            slug: 'clear-data',
            title: clearDataAttrs.title || 'Untitled',
            date: clearDataAttrs.date || new Date().toISOString().split('T')[0],
            tags: clearDataAttrs.tags || [],
            excerpt: clearDataAttrs.excerpt || clearDataBody.slice(0, 100) + '...',
            content: clearDataBody,
            wordCount: clearDataBody.trim().split(/\s+/).length,
            isPinned: clearDataAttrs.isPinned,
        });
        
        // Process hide-env.md
        const { attributes: hideEnvAttrs, body: hideEnvBody } = frontMatter<FrontMatterAttributes>(hideEnvContent.default);
        articles.push({
            id: 'hide-env',
            slug: 'hide-env',
            title: hideEnvAttrs.title || 'Untitled',
            date: hideEnvAttrs.date || new Date().toISOString().split('T')[0],
            tags: hideEnvAttrs.tags || [],
            excerpt: hideEnvAttrs.excerpt || hideEnvBody.slice(0, 100) + '...',
            content: hideEnvBody,
            wordCount: hideEnvBody.trim().split(/\s+/).length,
            isPinned: hideEnvAttrs.isPinned,
        });
    } catch (error) {
        console.error('Error loading kernel articles:', error);
    }
    
    return articles;
}
