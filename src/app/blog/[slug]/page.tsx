import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, User, Share2 } from 'lucide-react';
import { getBlogPost, getAllBlogSlugs, getAllBlogPosts } from '@/lib/blog';
import { mdxComponents } from '@/lib/mdx-components';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { YouTubeEmbed } from '@/components/youtube-embed';

export async function generateStaticParams() {
  const slugs = await getAllBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    return { title: 'Not Found' };
  }

  return {
    title: post.title,
    description: post.description,
  };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const allPosts = await getAllBlogPosts();
  const currentIndex = allPosts.findIndex((p) => p.slug === slug);
  const relatedPosts = allPosts
    .filter((_, i) => i !== currentIndex)
    .slice(0, 2);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-slate-900/5 dark:to-slate-900/50">
      <Header />

      {/* Article Header */}
      <article className="max-w-3xl mx-auto px-6 py-16 sm:py-24">
        <Link href="/blog" className="inline-flex items-center gap-2 text-accent hover:text-accent-light mb-8">
          <ArrowLeft size={20} /> Back to Blog
        </Link>

        <div className="mb-12">
          <div className="flex items-center gap-4 flex-wrap text-sm text-foreground/50 mb-6">
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-accent/10 text-accent uppercase">
              {post.category}
            </span>
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              {formatDate(post.date)}
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} />
              {post.readTime}
            </div>
            <div className="flex items-center gap-2">
              <User size={16} />
              {post.author}
            </div>
          </div>

          <h1 className="text-5xl sm:text-6xl font-bold tracking-[-.02em] mb-6">
            {post.title}
          </h1>
          <p className="text-xl text-foreground/60 leading-relaxed">
            {post.description}
          </p>
        </div>

        {/* Article Content */}
        <div className="prose prose-invert max-w-none mb-12 space-y-8">
          {post.youtubeId && (
            <div className="mb-8">
              <YouTubeEmbed 
                videoId={post.youtubeId} 
                title={post.youtubeTitle || 'Article Video'}
              />
            </div>
          )}
          <MDXRemote source={post.content} components={mdxComponents} />
        </div>

        {/* Author Info */}
        <div className="py-8 border-t border-b border-border/50">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center text-2xl">
              👨‍💻
            </div>
            <div>
              <h3 className="font-bold text-lg">{post.author}</h3>
              <p className="text-foreground/60">Creative Senior Software Engineer specializing in full-stack development and scalable systems.</p>
            </div>
          </div>
        </div>

        {/* Share */}
        <div className="py-8 flex items-center gap-4">
          <span className="text-foreground/60">Share this article:</span>
          <div className="flex gap-3">
            <button title="Share on LinkedIn" className="p-3 rounded-full border border-border/50 hover:border-accent hover:text-accent transition-all">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-3.846 19.275c-1.529 1.529-3.587 2.371-5.731 2.371-4.126 0-7.5-3.374-7.5-7.5s3.374-7.5 7.5-7.5 7.5 3.374 7.5 7.5c0 2.144-.842 4.202-2.371 5.731z"/></svg>
            </button>
            <button title="Share on Twitter" className="p-3 rounded-full border border-border/50 hover:border-accent hover:text-accent transition-all">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.915.405-1.897.648-2.925.765 1.051-.628 1.858-1.623 2.237-2.808-.984.583-2.075.998-3.238 1.223-.929-.987-2.253-1.603-3.718-1.603-2.813 0-5.094 2.281-5.094 5.094 0 .399.048.789.144 1.163-4.233-.211-7.989-2.24-10.514-5.32-.438.756-.689 1.636-.689 2.575 0 1.768.901 3.327 2.266 4.242-.838-.027-1.627-.256-2.317-.64v.064c0 2.467 1.756 4.524 4.086 4.993-.427.117-.878.182-1.344.182-.329 0-.648-.032-.961-.095.631 1.956 2.445 3.379 4.594 3.419-1.745 1.367-3.941 2.181-6.333 2.181-.411 0-.815-.024-1.213-.071 2.134 1.369 4.672 2.165 7.39 2.165 8.868 0 13.701-7.35 13.701-13.701 0-.209-.005-.418-.015-.627.941-.68 1.757-1.531 2.401-2.431z"/></svg>
            </button>
            <button title="Copy link" className="p-3 rounded-full border border-border/50 hover:border-accent hover:text-accent transition-all">
              <Share2 size={20} />
            </button>
          </div>
        </div>

        {/* Related Articles */}
        <section className="py-12 border-t border-border/50">
          <h2 className="text-3xl font-bold mb-8">Related Articles</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {relatedPosts.map((relatedPost) => (
              <Link 
                key={relatedPost.slug}
                href={`/blog/${relatedPost.slug}`} 
                className="group p-6 rounded-xl border border-border/50 hover:border-accent/50 transition-all"
              >
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-accent/10 text-accent uppercase">
                  {relatedPost.category}
                </span>
                <h3 className="text-xl font-bold mt-4 group-hover:text-accent transition-colors">
                  {relatedPost.title}
                </h3>
                <p className="text-foreground/60 mt-2">{relatedPost.readTime}</p>
              </Link>
            ))}
          </div>
        </section>
      </article>

      <Footer />
    </div>
  );
}
