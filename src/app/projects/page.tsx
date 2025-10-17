import Link from 'next/link';
import { Zap, ArrowRight, Github, ExternalLink, Play, Star } from 'lucide-react';
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
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black">
      {/* Navigation */}
      <Header />

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20 lg:py-32 relative">
        {/* Animated grid background */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 via-transparent to-purple-500/10 pointer-events-none" />
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full filter blur-3xl" />
          <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full filter blur-3xl" />
        </div>

        <div className="flex items-center gap-2 mb-6">
          <Zap size={24} className="text-cyan-400" />
          <span className="font-mono text-sm text-cyan-400 tracking-wider">// Featured Projects</span>
        </div>

        <h1 className="font-mono text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tighter leading-tight mb-4 sm:mb-6">
          <span className="text-white">Project</span>
          <br />
          <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            Case Studies
          </span>
        </h1>
        <p className="font-sans text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
          A selection of recent work showcasing full-stack development, design systems, and scalable architecture.
        </p>
      </section>

      {/* Featured Projects */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20 border-t border-slate-800">
        <div className="mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tighter text-white">
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Work</span>
          </h2>
        </div>

        <div className="grid gap-8 sm:gap-12">
          {featuredProjects.map((project) => (
            <div
              key={project.slug}
              className="group relative overflow-hidden rounded-lg border border-slate-700/50 hover:border-cyan-500/50 transition-all hover:shadow-lg hover:shadow-cyan-500/20 bg-gradient-to-br from-slate-900/50 to-slate-800/30 p-6 sm:p-8 grid md:grid-cols-2 gap-6 sm:gap-8 hover:bg-slate-900/70"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 via-transparent to-purple-500/0 group-hover:from-cyan-500/5 group-hover:to-purple-500/5 transition-all duration-500 pointer-events-none" />

              <Link
                href={`/projects/${project.slug}`}
                className="absolute inset-0 z-20 md:col-span-1 md:row-span-2 cursor-pointer"
                aria-label={project.title}
              />

              <div className="flex items-center justify-center cursor-pointer relative z-10 md:z-0">
                <div className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl">{project.image}</div>
              </div>

              <div className="flex flex-col justify-between relative z-10">
                <div>
                  <div className="flex items-center gap-3 mb-4 flex-wrap">
                    <span className="text-xs font-mono font-bold px-3 py-1 rounded bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 uppercase">
                      {formatDate(project.date)}
                    </span>
                    <span className="text-xs sm:text-sm text-slate-400">{project.role}</span>
                    {project.featured && (
                      <div className="flex items-center gap-1 bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded text-xs sm:text-sm font-medium border border-cyan-500/30">
                        <Star size={14} fill="currentColor" /> Featured
                      </div>
                    )}
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold text-white group-hover:text-cyan-400 transition-colors mb-4">
                    {project.title}
                  </h3>

                  <p className="text-sm sm:text-base text-slate-400 leading-relaxed mb-4">{project.longDescription}</p>
                  <p className="text-sm sm:text-base text-cyan-400 font-semibold mb-6">📈 {project.impact}</p>
                </div>

                <div className="flex flex-col gap-4">
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag: string) => (
                      <span
                        key={tag}
                        className="text-xs font-mono px-3 py-1 rounded bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 pt-4 border-t border-slate-700/50">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center sm:justify-start gap-2 px-4 py-2 rounded border border-slate-700 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-all text-sm relative z-30"
                      >
                        <Github size={18} /> Code
                      </a>
                    )}
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center sm:justify-start gap-2 px-4 py-2 rounded bg-gradient-to-r from-cyan-500 to-blue-500 text-slate-950 font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all text-sm relative z-30"
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
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20 border-t border-slate-800">
        <div className="mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tighter text-white">
            Other <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Projects</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
          {otherProjects.map((project) => (
            <div
              key={project.slug}
              className="group relative overflow-hidden rounded-lg border border-slate-700/50 hover:border-purple-500/50 transition-all hover:shadow-lg hover:shadow-purple-500/20 bg-gradient-to-br from-slate-900/50 to-slate-800/30 p-6 sm:p-8 flex flex-col gap-6 hover:bg-slate-900/70"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 via-transparent to-pink-500/0 group-hover:from-purple-500/5 group-hover:to-pink-500/5 transition-all duration-500 pointer-events-none" />

              <Link
                href={`/projects/${project.slug}`}
                className="absolute inset-0 z-20"
                aria-label={project.title}
              />

              <div className="text-5xl sm:text-6xl relative z-10">{project.image}</div>

              <div className="flex flex-col gap-3 flex-1 relative z-10">
                <div className="flex items-center gap-3 mb-2 flex-wrap">
                  <span className="text-xs font-mono font-bold px-3 py-1 rounded bg-purple-500/20 text-purple-400 border border-purple-500/30 uppercase">
                    {formatDate(project.date)}
                  </span>
                  {project.youtubeId && (
                    <span className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded bg-red-500/20 text-red-400">
                      <Play size={12} /> Video
                    </span>
                  )}
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-purple-400 transition-colors">{project.title}</h3>
                <p className="text-sm sm:text-base text-slate-400 leading-relaxed flex-1">{project.description}</p>
                <p className="text-xs sm:text-sm text-purple-400 font-semibold">📈 {project.impact}</p>
              </div>

              <div className="flex flex-col gap-4 mt-auto pt-4 border-t border-slate-700/50 relative z-10">
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="text-xs font-mono px-3 py-1 rounded bg-slate-800/50 border border-slate-700/50 text-slate-300 hover:text-purple-400 hover:border-purple-500/50 hover:bg-purple-500/10 transition-all"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3 relative z-30">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs sm:text-sm text-slate-400 hover:text-purple-400 transition-colors"
                    >
                      <Github size={16} /> Code
                    </a>
                  )}
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs sm:text-sm text-purple-400 hover:text-pink-400 transition-colors"
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

      {/* CTA Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20 rounded-lg bg-gradient-to-br from-slate-900/50 via-slate-800/50 to-slate-900/50 border border-cyan-500/30 my-16 sm:my-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5 pointer-events-none" />
        <div className="text-center max-w-2xl mx-auto relative z-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tighter mb-4 sm:mb-6 text-white">
            Have a Project in <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Mind?</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-400 mb-8">
            Let's collaborate and bring your ideas to life.
          </p>
          <a
            href="mailto:hello@example.com"
            className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-slate-950 font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
          >
            Start a Conversation <ArrowRight size={20} />
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
