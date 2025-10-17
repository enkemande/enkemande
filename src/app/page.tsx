import Link from 'next/link';
import { ArrowRight, Github, Linkedin, Twitter, Mail, ExternalLink, Star } from 'lucide-react';
import { getFeaturedProjects } from '@/lib/projects';
import { getRecentBlogPosts } from '@/lib/blog';
import { SKILLS } from '@/lib/skills';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export default async function Home() {
  const featuredProjects = await getFeaturedProjects();
  const recentBlogPosts = await getRecentBlogPosts(3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-slate-900/5 dark:to-slate-900/50">
      <Header />

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20 lg:py-32">
        <div className="flex flex-col gap-8 max-w-3xl">
          <div>
            <h1 className="font-sans text-4xl sm:text-5xl lg:text-7xl font-bold tracking-[-.02em] leading-tight mb-4 sm:mb-6">
              Creative Senior <span className="text-accent">Software Engineer</span>
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-foreground/70 leading-relaxed">
              I craft elegant, scalable solutions that bridge design and engineering. Specializing in full-stack development, design systems, and creating products that people love.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
            <Link
              href="/projects"
              className="inline-flex items-center justify-center sm:justify-start gap-2 px-6 py-3 bg-accent text-background rounded-full font-medium hover:bg-accent-light transition-all hover:gap-3"
            >
              View My Work <ArrowRight size={20} />
            </Link>
            <Link
              href="/resume"
              className="inline-flex items-center justify-center sm:justify-start gap-2 px-6 py-3 border border-border rounded-full font-medium hover:border-accent hover:text-accent transition-all"
            >
              View Resume <ArrowRight size={20} />
            </Link>
          </div>

          <div className="flex gap-3 sm:gap-4 pt-4">
            <a
              href="https://github.com/enkemande"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full border border-border hover:border-accent hover:text-accent transition-all"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/edison-nkemande/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full border border-border hover:border-accent hover:text-accent transition-all"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            {/* <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full border border-border hover:border-accent hover:text-accent transition-all"
              aria-label="Twitter"
            >
              <Twitter size={20} />
            </a> */}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section id="projects" className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20 border-t border-border/50">
        <div className="mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[-.02em] mb-4">Featured Projects</h2>
          <p className="text-base sm:text-lg text-foreground/60">Showcase of recent work and creative solutions</p>
        </div>

        <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
          {featuredProjects.map((project) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="group relative overflow-hidden rounded-xl border border-border/50 hover:border-accent/50 transition-all hover:shadow-lg hover:shadow-accent/10 bg-slate-950/30 dark:bg-slate-900/20 p-6 sm:p-8 flex flex-col gap-6"
            >
              <div className="flex items-start justify-between">
                <div className="text-4xl sm:text-5xl">{project.image}</div>
                {project.featured && (
                  <div className="flex items-center gap-1 bg-accent/10 text-accent px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                    <Star size={14} fill="currentColor" /> Featured
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-3 flex-1">
                <h3 className="text-xl sm:text-2xl font-bold group-hover:text-accent transition-colors">{project.title}</h3>
                <p className="text-sm sm:text-base text-foreground/60 leading-relaxed flex-1">{project.description}</p>
              </div>

              <div className="flex flex-wrap gap-2 pt-4 border-t border-border/30">
                {project.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="text-xs font-medium px-3 py-1 rounded-full bg-accent/10 text-accent"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-2 text-accent pt-2 group-hover:gap-3 transition-all">
                View Project <ExternalLink size={18} />
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 border-2 border-accent text-accent rounded-full font-medium hover:bg-accent hover:text-background transition-all text-sm sm:text-base"
          >
            View All Projects <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      {/* Skills Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20 border-t border-border/50">
        <div className="mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[-.02em] mb-4">Expertise</h2>
          <p className="text-base sm:text-lg text-foreground/60">Technologies and skills I work with</p>
        </div>

        <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-4">
          {SKILLS.map((skill) => (
            <div key={skill.category} className="p-4 sm:p-6 rounded-xl bg-slate-950/30 dark:bg-slate-900/20 border border-border/50">
              <h3 className="font-bold text-base sm:text-lg mb-4 text-accent">{skill.category}</h3>
              <div className="flex flex-wrap gap-2">
                {skill.items.map((item) => (
                  <span
                    key={item}
                    className="text-xs sm:text-sm px-3 py-1 rounded-full bg-foreground/5 border border-border/50 hover:border-accent/50 transition-all"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Blog Posts */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20 border-t border-border/50">
        <div className="mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[-.02em] mb-4">Latest Articles</h2>
          <p className="text-base sm:text-lg text-foreground/60">Insights on software engineering and design</p>
        </div>

        <div className="grid gap-6 sm:gap-8">
          {recentBlogPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group p-6 sm:p-8 rounded-xl border border-border/50 hover:border-accent/50 bg-slate-950/30 dark:bg-slate-900/20 transition-all hover:shadow-lg hover:shadow-accent/10"
            >
              <div className="flex flex-col sm:flex-row items-start justify-between gap-4 mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3 flex-wrap">
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-accent/10 text-accent uppercase">
                      {post.category}
                    </span>
                    <span className="text-xs sm:text-sm text-foreground/50">{post.readTime}</span>
                  </div>
                  <h3 className="text-lg sm:text-2xl font-bold group-hover:text-accent transition-colors mb-2">{post.title}</h3>
                  <p className="text-sm sm:text-base text-foreground/60 leading-relaxed mb-4">{post.description}</p>
                  <span className="text-xs sm:text-sm text-foreground/50">{post.date}</span>
                </div>
                <ExternalLink size={20} className="text-foreground/40 group-hover:text-accent transition-colors flex-shrink-0 mt-2 sm:mt-0" />
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 border-2 border-accent text-accent rounded-full font-medium hover:bg-accent hover:text-background transition-all text-sm sm:text-base"
          >
            Read All Articles <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section
        id="contact"
        className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20 rounded-2xl bg-gradient-to-br from-accent/5 to-accent/10 border border-accent/20 my-16 sm:my-20"
      >
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[-.02em] mb-4 sm:mb-6">Let's Build Something Amazing</h2>
          <p className="text-base sm:text-lg text-foreground/70 mb-8">
            Whether you have a project in mind or just want to chat, I'm always open to new opportunities and collaborations.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <a
              href="mailto:hello@example.com"
              className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 bg-accent text-background rounded-full font-medium hover:bg-accent-light transition-all text-sm sm:text-base"
            >
              <Mail size={20} /> Send Me an Email
            </a>
            <Link
              href="https://calendly.com"
              target="_blank"
              className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 border-2 border-accent text-accent rounded-full font-medium hover:bg-accent hover:text-background transition-all text-sm sm:text-base"
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
