import Link from 'next/link';
import { Code2, ArrowRight, Calendar, Clock, User, Play, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { getPaginatedBlogPosts, getAllCategories } from '@/lib/blog';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

interface BlogPageProps {
  searchParams: Promise<{ category?: string; page?: string }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const { category, page } = await searchParams;
  const currentPage = Math.max(1, parseInt(page || '1', 10));
  const postsPerPage = 6;
  
  const { posts: blogPosts, totalPages, currentPage: validPage, totalPosts } = await getPaginatedBlogPosts(
    currentPage,
    postsPerPage,
    category || undefined
  );

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
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black">
      {/* Navigation */}
      <Header />

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20 lg:py-32 relative">
        {/* Animated grid background */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 via-transparent to-purple-500/10 pointer-events-none" />
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full filter blur-3xl" />
          <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full filter blur-3xl" />
        </div>

        <div className="flex items-center gap-2 mb-6">
          <Code2 size={24} className="text-blue-400" />
          <span className="font-mono text-sm text-blue-400 tracking-wider">$ npm blog</span>
        </div>

        <h1 className="font-mono text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tighter leading-tight mb-4 sm:mb-6">
          <span className="text-white">Latest</span>
          <br />
          <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Articles & Insights
          </span>
        </h1>
        <p className="font-sans text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
          Thoughts on software engineering, design systems, web performance, and modern development practices.
        </p>
      </section>

      {/* Blog Posts */}
      <section id="posts" className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20 border-t border-slate-800">
        {blogPosts.length === 0 ? (
          <div className="text-center text-slate-400">No blog posts found.</div>
        ) : (
          <>
            <div className="grid gap-6 sm:gap-8">
              {blogPosts.map((post) => (
                <div
                  key={post.slug}
                  className="group relative overflow-hidden p-6 sm:p-8 rounded-lg border border-slate-700/50 hover:border-blue-500/50 bg-gradient-to-br from-slate-900/50 to-slate-800/30 transition-all hover:shadow-lg hover:shadow-blue-500/20 hover:bg-slate-900/70"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-transparent to-cyan-500/0 group-hover:from-blue-500/5 group-hover:to-cyan-500/5 transition-all duration-500 pointer-events-none rounded-lg" />

                  <Link
                    href={`/blog/${post.slug}`}
                    className="absolute inset-0 z-20"
                    aria-label={post.title}
                  />

                  <div className="flex flex-col sm:flex-row items-start justify-between gap-4 sm:gap-6 relative z-10">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-4 flex-wrap">
                        <span className="text-xs font-mono font-bold px-3 py-1 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30 uppercase">
                          {post.category}
                        </span>
                        {post.youtubeId && (
                          <span className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded bg-red-500/20 text-red-400">
                            <Play size={12} /> Video
                          </span>
                        )}
                      </div>

                      <h2 className="text-xl sm:text-2xl font-bold text-white group-hover:text-blue-400 transition-colors mb-3">{post.title}</h2>
                      <p className="text-sm sm:text-base text-slate-400 leading-relaxed mb-4">{post.description}</p>

                      <div className="flex items-center gap-3 sm:gap-6 flex-wrap text-xs sm:text-sm text-slate-500 font-mono">
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

                    <ExternalLink size={20} className="text-slate-500 group-hover:text-blue-400 transition-colors flex-shrink-0 mt-2 sm:mt-0" />
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-4 mt-12 sm:mt-16">
                {validPage > 1 && (
                  <Link
                    href={`/blog?${category ? `category=${encodeURIComponent(category)}&` : ''}page=${validPage - 1}#posts`}
                    className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-lg border border-slate-700 text-slate-300 hover:border-blue-500 hover:text-blue-400 transition-all"
                  >
                    <ChevronLeft size={18} />
                    <span className="hidden sm:inline">Previous</span>
                  </Link>
                )}

                <div className="flex items-center gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                    <Link
                      key={pageNum}
                      href={`/blog?${category ? `category=${encodeURIComponent(category)}&` : ''}page=${pageNum}#posts`}
                      className={`px-3 sm:px-4 py-2 rounded-lg border transition-all text-sm font-medium ${
                        validPage === pageNum
                          ? 'border-blue-500 bg-blue-500/20 text-blue-400'
                          : 'border-slate-700 text-slate-400 hover:border-blue-500/50 hover:text-blue-400'
                      }`}
                    >
                      {pageNum}
                    </Link>
                  ))}
                </div>

                {validPage < totalPages && (
                  <Link
                    href={`/blog?${category ? `category=${encodeURIComponent(category)}&` : ''}page=${validPage + 1}#posts`}
                    className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-lg border border-slate-700 text-slate-300 hover:border-blue-500 hover:text-blue-400 transition-all"
                  >
                    <span className="hidden sm:inline">Next</span>
                    <ChevronRight size={18} />
                  </Link>
                )}
              </div>
            )}

            {/* Page Info */}
            {totalPages > 0 && (
              <div className="text-center mt-8 text-xs sm:text-sm text-slate-500 font-mono">
                Page {validPage} of {totalPages} • Showing {blogPosts.length} of {totalPosts} posts
              </div>
            )}
          </>
        )}
      </section>

      {/* CTA Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20 rounded-lg bg-gradient-to-br from-slate-900/50 via-slate-800/50 to-slate-900/50 border border-blue-500/30 my-16 sm:my-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 pointer-events-none" />
        <div className="text-center max-w-2xl mx-auto relative z-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tighter mb-4 sm:mb-6 text-white">
            Stay <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Updated</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-400 mb-8">
            Get notified when new articles are published.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-6 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-slate-300 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-all"
            />
            <button className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-slate-950 font-semibold rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
