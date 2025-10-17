import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, User, Play } from 'lucide-react';
import { getBlogPostsByCategory, getAllCategories } from '@/lib/blog';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

interface BlogPageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const { category } = await searchParams;
  const blogPosts = await getBlogPostsByCategory(category || '');

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Get unique categories from posts
  const allCategories = await getAllCategories();
  const activeCategory = category || 'all';

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-slate-900/5 dark:to-slate-900/50">
      {/* Navigation */}
      <Header />

      {/* Header */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-24">
        <Link href="/" className="inline-flex items-center gap-2 text-accent hover:text-accent-light mb-6 sm:mb-8">
          <ArrowLeft size={20} /> Back Home
        </Link>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-[-.02em] mb-4 sm:mb-6">Blog</h1>
        <p className="text-base sm:text-lg text-foreground/60 max-w-2xl">
          Insights and deep dives on software engineering, design systems, web performance, and modern development practices.
        </p>
        {category && (
          <p className="text-xs sm:text-sm text-accent mt-4">
            Filtering by: <span className="font-semibold">{category}</span>
          </p>
        )}
      </section>

      {/* Category Filter */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8 border-t border-border/50">
        <div className="flex gap-2 sm:gap-3 flex-wrap">
          <Link
            href="/blog"
            className={`px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium border transition-all ${
              activeCategory === 'all'
                ? 'border-accent bg-accent/10 text-accent'
                : 'border-border/50 text-foreground/70 hover:border-accent/50 hover:text-foreground'
            }`}
          >
            All
          </Link>
          {allCategories.map((cat) => (
            <Link
              key={cat}
              href={`/blog?category=${encodeURIComponent(cat)}`}
              className={`px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium border transition-all ${
                activeCategory.toLowerCase() === cat.toLowerCase()
                  ? 'border-accent bg-accent/10 text-accent'
                  : 'border-border/50 text-foreground/70 hover:border-accent/50 hover:text-foreground'
              }`}
            >
              {cat}
            </Link>
          ))}
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        {blogPosts.length === 0 ? (
          <div className="text-center text-foreground/60">No blog posts found.</div>
        ) : (
          <div className="grid gap-6 sm:gap-8">
            {blogPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group p-6 sm:p-8 rounded-xl border border-border/50 hover:border-accent/50 bg-slate-950/30 dark:bg-slate-900/20 transition-all hover:shadow-lg hover:shadow-accent/10"
              >
                <div className="flex flex-col sm:flex-row items-start justify-between gap-4 sm:gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4 flex-wrap">
                      <span className="text-xs font-bold px-3 py-1 rounded-full bg-accent/10 text-accent uppercase">
                        {post.category}
                      </span>
                      {post.youtubeId && (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full bg-red-500/10 text-red-500">
                          <Play size={12} /> Video
                        </span>
                      )}
                    </div>

                    <h2 className="text-xl sm:text-3xl font-bold mb-3 sm:mb-4 group-hover:text-accent transition-colors">{post.title}</h2>
                    <p className="text-sm sm:text-base text-foreground/60 leading-relaxed mb-4 sm:mb-6">{post.description}</p>

                    <div className="flex items-center gap-3 sm:gap-6 flex-wrap text-xs sm:text-sm text-foreground/50">
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
                  </div>

                  <div className="flex-shrink-0 text-accent group-hover:translate-x-1 transition-transform">
                    <svg
                      className="w-5 sm:w-6 h-5 sm:h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Newsletter CTA */}
      <section className="max-w-2xl mx-auto px-4 sm:px-6 py-16 sm:py-20 rounded-2xl bg-gradient-to-br from-accent/5 to-accent/10 border border-accent/20 my-16 sm:my-20 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">Stay Updated</h2>
        <p className="text-sm sm:text-base text-foreground/60 mb-8">Get notified when new articles are published.</p>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-4 py-3 rounded-full bg-background/50 border border-border/50 focus:outline-none focus:border-accent transition-colors text-sm"
          />
          <button className="px-6 py-3 bg-accent text-background rounded-full font-medium hover:bg-accent-light transition-all text-sm">
            Subscribe
          </button>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
