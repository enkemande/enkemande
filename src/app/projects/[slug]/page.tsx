import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Github, ExternalLink } from 'lucide-react';
import { getProject, getAllProjectSlugs, getAllProjects } from '@/lib/projects';
import { mdxComponents } from '@/components/mdx-components';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { YouTubeEmbed } from '@/components/youtube-embed';
import rehypePrettyCode from 'rehype-pretty-code';

export async function generateStaticParams() {
  const slugs = await getAllProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    return { title: 'Not Found' };
  }

  return {
    title: project.title,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    notFound();
  }

  const allProjects = await getAllProjects();
  const currentIndex = allProjects.findIndex((p) => p.slug === slug);
  const relatedProjects = allProjects
    .filter((_, i) => i !== currentIndex)
    .slice(0, 2);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-slate-900/5 dark:to-slate-900/50">
      {/* Navigation */}
      <Header />

      {/* Project Header */}
      <article className="max-w-3xl mx-auto px-6 py-16 sm:py-24">
        <Link href="/projects" className="inline-flex items-center gap-2 text-accent hover:text-accent-light mb-8">
          <ArrowLeft size={20} /> Back to Projects
        </Link>

        <div className="mb-12">
          <div className="flex items-center gap-4 flex-wrap text-sm text-foreground/50 mb-6">
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-accent/10 text-accent uppercase">
              {new Date(project.date).getFullYear()}
            </span>
            <span className="text-sm">{project.role}</span>
          </div>

          <h1 className="text-5xl sm:text-6xl font-bold tracking-[-.02em] mb-6">
            {project.title}
          </h1>
          <p className="text-xl text-foreground/60 leading-relaxed mb-6">
            {project.description}
          </p>
          
          <div className="flex flex-wrap gap-2 mb-8">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-medium px-3 py-1 rounded-full bg-accent/10 text-accent"
              >
                {tag}
              </span>
            ))}
          </div>

          {(project.github || project.live) && (
            <div className="flex gap-3 pt-4">
              {project.github && (
                <a
                  href={project.github}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border hover:border-accent hover:text-accent transition-all"
                >
                  <Github size={18} /> View Code
                </a>
              )}
              {project.live && (
                <a
                  href={project.live}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent text-background hover:bg-accent-light transition-all"
                >
                  <ExternalLink size={18} /> Visit Live
                </a>
              )}
            </div>
          )}
        </div>

        {/* Project Content */}
        <div className="prose prose-invert max-w-none mb-12 space-y-8">
            {project.youtubeId && (
                <div className="mb-8">
                    <YouTubeEmbed 
                    videoId={project.youtubeId} 
                    title={project.youtubeTitle || 'Article Video'}
                    />
                </div>
            )}
          <MDXRemote 
            source={project.content} 
            components={mdxComponents}
            options={{
              mdxOptions: {
                rehypePlugins: [
                  [
                    rehypePrettyCode,
                    {
                      theme: 'dracula',
                      keepBackground: true,
                    },
                  ],
                ],
              },
            }}
          />
        </div>

        {/* Project Impact */}
        <div className="py-8 border-t border-b border-border/50">
          <h3 className="text-lg font-bold mb-2">Project Impact</h3>
          <p className="text-accent font-semibold text-lg">📈 {project.impact}</p>
        </div>

        {/* Related Projects */}
        {relatedProjects.length > 0 && (
          <section className="py-12 border-t border-border/50">
            <h2 className="text-3xl font-bold mb-8">Related Projects</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {relatedProjects.map((relatedProject) => (
                <Link 
                  key={relatedProject.slug}
                  href={`/projects/${relatedProject.slug}`} 
                  className="group p-6 rounded-xl border border-border/50 hover:border-accent/50 transition-all"
                >
                  <div className="text-4xl mb-4">{relatedProject.image}</div>
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-accent/10 text-accent uppercase">
                    {relatedProject.role}
                  </span>
                  <h3 className="text-xl font-bold mt-4 group-hover:text-accent transition-colors">
                    {relatedProject.title}
                  </h3>
                  <p className="text-foreground/60 mt-2 text-sm">{relatedProject.impact}</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>

      {/* Footer */}
      <Footer />
    </div>
  );
}
