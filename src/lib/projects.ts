'use server';

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const projectsDir = path.join(process.cwd(), 'src/content/projects');

export interface Project {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  date: string;
  image: string;
  role: string;
  impact: string;
  featured: boolean;
  tags: string[];
  github?: string;
  live?: string;
  content: string;
  youtubeId?: string;
  youtubeTitle?: string;
}

/**
 * Get all project slugs
 */
export async function getAllProjectSlugs(): Promise<string[]> {
  if (!fs.existsSync(projectsDir)) {
    return [];
  }

  return fs
    .readdirSync(projectsDir)
    .filter((file) => file.endsWith('.mdx') || file.endsWith('.md'))
    .map((file) => file.replace(/\.mdx?$/, ''));
}

/**
 * Get a single project by slug
 */
export async function getProject(slug: string): Promise<Project | null> {
  const files = fs.readdirSync(projectsDir);
  const mdxFile = files.find(
    (file) => file.replace(/\.mdx?$/, '') === slug && (file.endsWith('.mdx') || file.endsWith('.md'))
  );

  if (!mdxFile) {
    return null;
  }

  const filePath = path.join(projectsDir, mdxFile);
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug,
    title: data.title || '',
    description: data.description || '',
    longDescription: data.longDescription || '',
    date: data.date || '',
    image: data.image || '🚀',
    role: data.role || '',
    impact: data.impact || '',
    featured: data.featured || false,
    tags: data.tags || [],
    github: data.github,
    live: data.live,
    content,
    youtubeId: data.youtubeId,
    youtubeTitle: data.youtubeTitle,
  };
}

/**
 * Get all projects
 */
export async function getAllProjects(): Promise<Project[]> {
  const slugs = await getAllProjectSlugs();
  const projects = await Promise.all(slugs.map((slug) => getProject(slug)));
  return projects
    .filter((project): project is Project => project !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/**
 * Get featured projects
 */
export async function getFeaturedProjects(): Promise<Project[]> {
  const projects = await getAllProjects();
  return projects.filter((project) => project.featured);
}

/**
 * Get all non-featured projects
 */
export async function getNonFeaturedProjects(): Promise<Project[]> {
  const projects = await getAllProjects();
  return projects.filter((project) => !project.featured);
}
