import Link from 'next/link';
import { ArrowRight, Github, Linkedin, Twitter, Mail, ExternalLink, Star, Code2, Zap, Globe } from 'lucide-react';
import { getFeaturedProjects } from '@/lib/projects';
import { getRecentBlogPosts } from '@/lib/blog';
import { SKILLS } from '@/lib/skills';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { AnimatedText } from '@/components/animated-text';

export default async function Home() {
  const featuredProjects = await getFeaturedProjects();
  const recentBlogPosts = await getRecentBlogPosts(3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black">
      <Header />

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20 lg:py-32 relative">
        {/* Animated grid background */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 via-transparent to-purple-500/10 pointer-events-none" />
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full filter blur-3xl" />
          <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full filter blur-3xl" />
        </div>

        <div className="flex flex-col gap-8 max-w-3xl">
          {/* Code-inspired header */}
          <div className="flex items-center gap-2 mb-4">
            <Code2 size={24} className="text-cyan-400" />
            <span className="font-mono text-sm text-cyan-400 tracking-wider">$ whoami</span>
          </div>

          <div>
            <h1 className="font-mono text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tighter leading-tight mb-4 sm:mb-6">
              <span className="text-white">Creative</span>
              <br />
              <span className="block min-h-[1.2em] bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                <AnimatedText
                  texts={[
                    'Full-Stack Engineer',
                    'UX/UI Designer',
                    'Problem Solver',
                    'System Architect',
                    'Web Innovator',
                    'AI Enthusiast'
                  ]}
                  interval={3000}
                />
              </span>
            </h1>
            <p className="font-sans text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
              Building elegant, performant solutions. Full-stack developer, design systems enthusiast, and maker of things on the internet.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <Link
              href="/projects"
              className="group relative inline-flex items-center justify-center sm:justify-start gap-2 px-6 sm:px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-slate-950 font-semibold rounded-lg overflow-hidden transition-all hover:shadow-lg hover:shadow-cyan-500/50"
            >
              <span className="relative z-10 flex items-center gap-2">
                View My Work <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
            <Link
              href="/resume"
              className="inline-flex items-center justify-center sm:justify-start gap-2 px-6 sm:px-8 py-3 border border-cyan-500/50 text-cyan-400 font-semibold rounded-lg hover:bg-cyan-500/10 hover:border-cyan-400 transition-all"
            >
              View Resume <ArrowRight size={20} />
            </Link>
          </div>

          <div className="flex gap-4 pt-6">
            <a
              href="https://github.com/enkemande"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-lg border border-slate-700 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-all duration-300"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/edison-nkemande/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-lg border border-slate-700 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-all duration-300"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section id="projects" className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20 border-t border-slate-800">
        <div className="mb-12 sm:mb-16">
          <div className="flex items-center gap-2 mb-4">
            <Zap size={24} className="text-cyan-400" />
            <span className="font-mono text-sm text-cyan-400 tracking-wider">// Featured Projects</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tighter mb-4 text-white">
            Latest <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Creations</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-400">Showcase of recent work and creative solutions</p>
        </div>

        <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
          {featuredProjects.map((project) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="group relative overflow-hidden rounded-lg border border-slate-700/50 hover:border-cyan-500/50 transition-all hover:shadow-lg hover:shadow-cyan-500/20 bg-gradient-to-br from-slate-900/50 to-slate-800/30 p-6 sm:p-8 flex flex-col gap-6 hover:bg-slate-900/70"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 via-transparent to-purple-500/0 group-hover:from-cyan-500/5 group-hover:to-purple-500/5 transition-all duration-500 pointer-events-none" />
              
              <div className="relative z-10 flex items-start justify-between">
                <div className="text-4xl sm:text-5xl">{project.image}</div>
                {project.featured && (
                  <div className="flex items-center gap-1 bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded-full text-xs sm:text-sm font-medium border border-cyan-500/30">
                    <Star size={14} fill="currentColor" /> Featured
                  </div>
                )}
              </div>

              <div className="relative z-10 flex flex-col gap-3 flex-1">
                <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors">{project.title}</h3>
                <p className="text-sm sm:text-base text-slate-400 leading-relaxed flex-1">{project.description}</p>
              </div>

              <div className="relative z-10 flex flex-wrap gap-2 pt-4 border-t border-slate-700/50">
                {project.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="text-xs font-mono px-3 py-1 rounded bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="relative z-10 flex items-center gap-2 text-cyan-400 pt-2 group-hover:gap-3 transition-all">
                View Project <ExternalLink size={18} />
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 border border-cyan-500/50 text-cyan-400 rounded-lg font-semibold hover:bg-cyan-500/10 hover:border-cyan-400 transition-all"
          >
            View All Projects <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      {/* Skills Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20 border-t border-slate-800">
        <div className="mb-12 sm:mb-16">
          <div className="flex items-center gap-2 mb-4">
            <Globe size={24} className="text-purple-400" />
            <span className="font-mono text-sm text-purple-400 tracking-wider">$ cat skills.md</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tighter mb-4 text-white">
            Tech <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Stack</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-400">Technologies and frameworks I work with</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {SKILLS.map((skillGroup) => (
            <div key={skillGroup.category} className="group p-6 rounded-lg bg-gradient-to-br from-slate-900/50 to-slate-800/30 border border-slate-700/50 hover:border-purple-500/50 transition-all">
              <div className="flex items-center gap-2 mb-4">
                <span className="inline-block w-2 h-2 rounded-full bg-purple-400"></span>
                <h3 className="font-mono font-bold text-lg text-purple-400">{skillGroup.category}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {skillGroup.items.map((skill) => (
                  <span
                    key={skill}
                    className="text-sm font-mono px-3 py-1 rounded bg-slate-800/50 border border-slate-700/50 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-all"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Blog Posts */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20 border-t border-slate-800">
        <div className="mb-12 sm:mb-16">
          <div className="flex items-center gap-2 mb-4">
            <Code2 size={24} className="text-blue-400" />
            <span className="font-mono text-sm text-blue-400 tracking-wider">$ npm blog</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tighter mb-4 text-white">
            Latest <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Articles</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-400">Thoughts on software engineering, design, and development</p>
        </div>

        <div className="grid gap-6 sm:gap-8">
          {recentBlogPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group p-6 sm:p-8 rounded-lg border border-slate-700/50 hover:border-blue-500/50 bg-gradient-to-br from-slate-900/50 to-slate-800/30 transition-all hover:shadow-lg hover:shadow-blue-500/10 hover:bg-slate-900/70"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-transparent to-cyan-500/0 group-hover:from-blue-500/5 group-hover:to-cyan-500/5 transition-all duration-500 pointer-events-none rounded-lg" />
              
              <div className="flex flex-col sm:flex-row items-start justify-between gap-4 mb-4 relative z-10">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3 flex-wrap">
                    <span className="text-xs font-mono font-bold px-3 py-1 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30 uppercase">
                      {post.category}
                    </span>
                    <span className="text-xs sm:text-sm font-mono text-slate-500">{post.readTime}</span>
                  </div>
                  <h3 className="text-lg sm:text-2xl font-bold text-white group-hover:text-blue-400 transition-colors mb-2">{post.title}</h3>
                  <p className="text-sm sm:text-base text-slate-400 leading-relaxed mb-4">{post.description}</p>
                  <span className="text-xs sm:text-sm font-mono text-slate-500">{post.date}</span>
                </div>
                <ExternalLink size={20} className="text-slate-500 group-hover:text-blue-400 transition-colors flex-shrink-0 mt-2 sm:mt-0" />
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 border border-blue-500/50 text-blue-400 rounded-lg font-semibold hover:bg-blue-500/10 hover:border-blue-400 transition-all"
          >
            Read All Articles <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section
        id="contact"
        className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20 rounded-lg bg-gradient-to-br from-slate-900/50 via-slate-800/50 to-slate-900/50 border border-cyan-500/30 my-16 sm:my-20 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5 pointer-events-none" />
        <div className="text-center max-w-2xl mx-auto relative z-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tighter mb-4 sm:mb-6 text-white">
            Let's Build Something <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Amazing</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-400 mb-8">
            Got an idea? Let's collaborate and build something that matters.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <a
              href="mailto:hello@example.com"
              className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-slate-950 font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
            >
              <Mail size={20} /> Send Me an Email
            </a>
            <Link
              href="https://calendly.com"
              target="_blank"
              className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 border border-cyan-500/50 text-cyan-400 font-semibold rounded-lg hover:bg-cyan-500/10 hover:border-cyan-400 transition-all"
            >
              Schedule a Call
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
