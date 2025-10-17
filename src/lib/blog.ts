'use server';

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const blogDir = path.join(process.cwd(), 'src/content/blog');

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  author: string;
  category: string;
  content: string;
  youtubeId?: string;
  youtubeTitle?: string;
}

/**
 * Get all blog post slugs
 */
export async function getAllBlogSlugs(): Promise<string[]> {
  if (!fs.existsSync(blogDir)) {
    return [];
  }

  return fs
    .readdirSync(blogDir)
    .filter((file) => file.endsWith('.mdx') || file.endsWith('.md'))
    .map((file) => file.replace(/\.mdx?$/, ''));
}

/**
 * Get a single blog post by slug
 */
export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const files = fs.readdirSync(blogDir);
  const mdxFile = files.find(
    (file) => file.replace(/\.mdx?$/, '') === slug && (file.endsWith('.mdx') || file.endsWith('.md'))
  );

  if (!mdxFile) {
    return null;
  }

  const filePath = path.join(blogDir, mdxFile);
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug,
    title: data.title || '',
    description: data.description || '',
    date: String(data.date || ''),
    readTime: data.readTime || '5 min read',
    author: data.author || 'Edison Nkemande',
    category: data.category || 'General',
    content,
    youtubeId: data.youtubeId,
    youtubeTitle: data.youtubeTitle,
  };
}

/**
 * Get all blog posts
 */
export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const slugs = await getAllBlogSlugs();
  const posts = await Promise.all(slugs.map((slug) => getBlogPost(slug)));
  return posts
    .filter((post): post is BlogPost => post !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/**
 * Get blog post metadata for listing pages
 */
export async function getBlogPostMetadata(slug: string) {
  const post = await getBlogPost(slug);
  if (!post) return null;

  return {
    slug,
    title: post.title,
    description: post.description,
    date: post.date,
    readTime: post.readTime,
    author: post.author,
    category: post.category,
    youtubeId: post.youtubeId,
    youtubeTitle: post.youtubeTitle,
  };
}

/**
 * Get all unique categories from blog posts
 */
export async function getAllCategories(): Promise<string[]> {
  const posts = await getAllBlogPosts();
  return Array.from(new Set(posts.map((post) => post.category))).sort();
}

/**
 * Get blog posts filtered by category
 */
export async function getBlogPostsByCategory(
  category: string
): Promise<BlogPost[]> {
  if (!category || category.toLowerCase() === 'all') {
    return getAllBlogPosts();
  }

  const posts = await getAllBlogPosts();
  return posts.filter(
    (post) => post.category.toLowerCase() === category.toLowerCase()
  );
}

/**
 * Get recent blog posts (limited to specified count)
 */
export async function getRecentBlogPosts(limit: number = 3): Promise<BlogPost[]> {
  const posts = await getAllBlogPosts();
  return posts.slice(0, limit);
}

/**
 * Get paginated blog posts
 */
export async function getPaginatedBlogPosts(
  page: number = 1,
  postsPerPage: number = 6,
  category?: string
): Promise<{ posts: BlogPost[]; totalPages: number; currentPage: number; totalPosts: number }> {
  const posts = category ? await getBlogPostsByCategory(category) : await getAllBlogPosts();
  const totalPosts = posts.length;
  const totalPages = Math.ceil(totalPosts / postsPerPage);
  
  // Ensure page is within valid range
  const validPage = Math.max(1, Math.min(page, totalPages || 1));
  const startIndex = (validPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  
  return {
    posts: posts.slice(startIndex, endIndex),
    totalPages,
    currentPage: validPage,
    totalPosts,
  };
}
