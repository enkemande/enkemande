import Link from 'next/link';
import { ArrowLeft, Github, ExternalLink, Calendar, Play } from 'lucide-react';
import { getFeaturedProjects, getNonFeaturedProjects } from '@/lib/projects';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export default async function ProjectsPage() {
  const featuredProjects = await getFeaturedProjects();
  const otherProjects = await getNonFeaturedProjects();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.getFullYear().toString();
  };

  return (
    <div suppressHydrationWarning className="min-h-screen bg-gradient-to-br from-background via-background to-slate-900/5 dark:to-slate-900/50">
        {/* Navigation */}
        <Header />

      {/* Header */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-24">
        <Link href="/" className="inline-flex items-center gap-2 text-accent hover:text-accent-light mb-6 sm:mb-8">
          <ArrowLeft size={20} /> Back Home
        </Link>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-[-.02em] mb-4 sm:mb-6">Projects & Case Studies</h1>
        <p className="text-base sm:text-lg text-foreground/60 max-w-3xl">
          A selection of my recent work showcasing full-stack development, design systems, and scalable architecture. Each project represents creative problem-solving and technical excellence.
        </p>
      </section>

      {/* Featured Projects */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20 border-t border-border/50">
        <h2 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-12">Featured Work</h2>
        <div className="grid gap-8 sm:gap-12">
          {featuredProjects.map((project) => (
            <div
              key={project.slug}
              className="group grid md:grid-cols-2 gap-6 sm:gap-8 p-6 sm:p-8 rounded-2xl border border-border/50 hover:border-accent/50 transition-all bg-slate-950/30 dark:bg-slate-900/20"
            >
              <Link href={`/projects/${project.slug}`} className="flex items-center justify-center cursor-pointer">
                <div className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl">{project.image}</div>
              </Link>
              <div className="flex flex-col justify-between">
                <Link href={`/projects/${project.slug}`} className="cursor-pointer">
                  <div>
                    <div className="flex items-center gap-3 mb-4 flex-wrap">
                      <span className="text-xs font-bold px-3 py-1 rounded-full bg-accent/10 text-accent uppercase">
                        {formatDate(project.date)}
                      </span>
                      <span className="text-xs sm:text-sm text-foreground/50">{project.role}</span>
                      {project.youtubeId && (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full bg-red-500/10 text-red-500">
                          <Play size={12} /> Video
                        </span>
                      )}
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold mb-4 group-hover:text-accent transition-colors">{project.title}</h3>
                    <p className="text-sm sm:text-base text-foreground/60 leading-relaxed mb-4">{project.longDescription}</p>
                    <p className="text-sm sm:text-base text-accent font-semibold mb-6">📈 {project.impact}</p>
                  </div>
                </Link>

                <div className="flex flex-col gap-4">
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag: string) => (
                      <span
                        key={tag}
                        className="text-xs font-medium px-3 py-1 rounded-full bg-accent/10 text-accent"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 pt-4">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center sm:justify-start gap-2 px-4 py-2 rounded-full border border-border hover:border-accent hover:text-accent transition-all text-sm"
                      >
                        <Github size={18} /> Code
                      </a>
                    )}
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center sm:justify-start gap-2 px-4 py-2 rounded-full bg-accent text-background hover:bg-accent-light transition-all text-sm"
                      >
                        <ExternalLink size={18} /> Visit
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Other Projects */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20 border-t border-border/50">
        <h2 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-12">Other Projects</h2>
        <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
          {otherProjects.map((project) => (
            <div
              key={project.slug}
              className="group p-6 sm:p-8 rounded-xl border border-border/50 hover:border-accent/50 transition-all bg-slate-950/30 dark:bg-slate-900/20 hover:shadow-lg hover:shadow-accent/10 flex flex-col gap-6"
            >
              <Link href={`/projects/${project.slug}`} className="cursor-pointer">
                <div className="text-5xl sm:text-6xl">{project.image}</div>
              </Link>
              <Link href={`/projects/${project.slug}`} className="cursor-pointer">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-accent/10 text-accent uppercase">
                      {formatDate(project.date)}
                    </span>
                    {project.youtubeId && (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full bg-red-500/10 text-red-500">
                        <Play size={12} /> Video
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-3 group-hover:text-accent transition-colors">{project.title}</h3>
                  <p className="text-sm sm:text-base text-foreground/60 leading-relaxed mb-4">{project.description}</p>
                  <p className="text-xs sm:text-sm text-accent font-semibold mb-4">📈 {project.impact}</p>
                </div>
              </Link>

              <div className="flex flex-col gap-4 mt-auto">
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="text-xs font-medium px-2 py-1 rounded-full bg-foreground/5 border border-border/50"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex gap-2 sm:gap-3 pt-2">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs sm:text-sm text-foreground/50 hover:text-accent transition-colors"
                    >
                      <Github size={16} /> Code
                    </a>
                  )}
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs sm:text-sm text-accent hover:text-accent-light transition-colors"
                    >
                      <ExternalLink size={16} /> Live
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-2xl mx-auto px-4 sm:px-6 py-16 sm:py-20 rounded-2xl bg-gradient-to-br from-accent/5 to-accent/10 border border-accent/20 my-16 sm:my-20 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">Have a Project in Mind?</h2>
        <p className="text-sm sm:text-base text-foreground/60 mb-8">Let's collaborate and bring your ideas to life.</p>
        <a
          href="mailto:hello@example.com"
          className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 bg-accent text-background rounded-full font-medium hover:bg-accent-light transition-all text-sm sm:text-base"
        >
          Start a Conversation
        </a>
      </section>

      {/* Footer */}
    <Footer />
    </div>
  );
}
