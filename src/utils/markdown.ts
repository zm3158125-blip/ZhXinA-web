
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
