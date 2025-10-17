import Link from 'next/link';
import { Download, Mail, MapPin, ExternalLink, ArrowRight, Globe } from 'lucide-react';
import { SKILLS } from '@/lib/skills';
import { EXPERIENCE, EDUCATION, CERTIFICATIONS } from '@/lib/resume';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

const RESUME_FILE = 'EDISON-NKEMANDE-RESUME.pdf';
const RESUME_FILENAME = 'Edison_Nkemande_Resume.pdf';

export default function ResumePage() {

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black">
      {/* Navigation */}
      <Header />

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20 lg:py-32 relative">
        {/* Animated grid background */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 via-transparent to-pink-500/10 pointer-events-none" />
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full filter blur-3xl" />
          <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-pink-500/5 rounded-full filter blur-3xl" />
        </div>

        <div className="flex items-center gap-2 mb-6">
          <Globe size={24} className="text-purple-400" />
          <span className="font-mono text-sm text-purple-400 tracking-wider">$ cat resume.md</span>
        </div>

        <div className="flex flex-col gap-8">
          <div>
            <h1 className="font-mono text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tighter leading-tight mb-4 sm:mb-6">
              <span className="text-white">Edison</span>
              <br />
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Nkemande
              </span>
            </h1>
            <p className="font-sans text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mb-4">
              Senior Software Engineer | Cloud Solutions Architect
            </p>
            <p className="text-base sm:text-base text-slate-400 leading-relaxed max-w-3xl">
              Innovative and results-driven Senior Software Engineer with 8+ years of experience building scalable web and mobile applications across fintech, payments, and service platforms.
            </p>
          </div>

          <div className="flex flex-wrap gap-6 pt-4">
            <div className="flex items-center gap-2 text-slate-300">
              <Mail size={20} className="text-purple-400" />
              <a href="mailto:nkemande@gmail.com" className="hover:text-purple-400 transition-colors">
                hello@nkemande.dev
              </a>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <MapPin size={20} className="text-purple-400" />
              <span>Missouri City, Texas</span>
            </div>
          </div>

          <div className="flex gap-4 pt-6">
            <a
              href={`/${RESUME_FILE}`}
              download={RESUME_FILENAME}
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-slate-950 font-semibold rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all"
            >
              <Download size={20} /> 
              Download PDF
            </a>
            <a
              href="https://github.com/enkemande"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 border border-slate-700 text-slate-400 hover:text-purple-400 hover:border-purple-500/50 hover:bg-purple-500/10 transition-all rounded-lg"
            >
              GitHub <ExternalLink size={18} />
            </a>
          </div>
        </div>
      </section>

      {/* Professional Experience */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20 border-t border-slate-800">
        <div className="mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tighter text-white">
            Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Experience</span>
          </h2>
        </div>

        <div className="space-y-12">
          {EXPERIENCE.map((job, index) => (
            <div key={index} className="relative pl-8 border-l-2 border-purple-500/30 hover:border-purple-500/60 transition-colors">
              <div className="absolute -left-3 top-0 w-6 h-6 bg-purple-500 rounded-full" />

              <div className="mb-4">
                <h3 className="text-2xl font-bold mb-1 text-white">{job.title}</h3>
                <p className="text-lg text-purple-400 font-semibold mb-2">{job.company}</p>
                <div className="flex flex-wrap gap-4 text-sm text-slate-500 font-mono">
                  <span>{job.period}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <MapPin size={14} />
                    {job.location}
                  </span>
                </div>
              </div>

              <ul className="space-y-2">
                {job.highlights.map((highlight, i) => (
                  <li key={i} className="text-slate-400 leading-relaxed flex gap-3">
                    <span className="text-purple-400 mt-1">▸</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20 border-t border-slate-800">
        <div className="mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tighter text-white">
            Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Skills</span>
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {SKILLS.map((skillGroup) => (
            <div key={skillGroup.category} className="p-6 rounded-lg bg-gradient-to-br from-slate-900/50 to-slate-800/30 border border-slate-700/50 hover:border-cyan-500/50 transition-all">
              <div className="flex items-center gap-2 mb-4">
                <span className="inline-block w-2 h-2 rounded-full bg-cyan-400"></span>
                <h3 className="font-mono font-bold text-lg text-cyan-400">{skillGroup.category}</h3>
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

      {/* Certifications */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20 border-t border-slate-800">
        <div className="mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tighter text-white">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Certifications</span>
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {CERTIFICATIONS.map((cert, index) => (
            <a
              key={index}
              href={cert.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-6 rounded-lg border border-slate-700/50 hover:border-blue-500 bg-gradient-to-br from-slate-900/50 to-slate-800/30 transition-all hover:shadow-lg hover:shadow-blue-500/30 hover:bg-slate-800/50"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-lg font-bold mb-2 text-white group-hover:text-blue-300 transition-colors">{cert.name}</h3>
                  <p className="text-blue-400 font-semibold text-sm mb-2">{cert.issuer}</p>
                  <span className="text-xs text-slate-500 font-mono">{cert.date}</span>
                </div>
                <ExternalLink size={20} className="text-slate-500 group-hover:text-blue-300 transition-colors flex-shrink-0 mt-1" />
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Education */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20 border-t border-slate-800">
        <div className="mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tighter text-white">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">Education</span>
          </h2>
        </div>

        <div className="space-y-6">
          {EDUCATION.map((edu, index) => (
            <div key={index} className="p-6 rounded-lg bg-gradient-to-br from-slate-900/50 to-slate-800/30 border border-slate-700/50 hover:border-pink-500/50 transition-all">
              <h3 className="text-xl font-bold mb-2 text-white">{edu.degree}</h3>
              <p className="text-lg text-pink-400 font-semibold mb-2">{edu.school}</p>
              <p className="text-slate-400 mb-3">{edu.details}</p>
              <div className="flex flex-wrap gap-6 text-sm text-slate-500 font-mono">
                <span>Graduated: {edu.graduation}</span>
                <span>•</span>
                <span>GPA: {edu.gpa}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20 rounded-lg bg-gradient-to-br from-slate-900/50 via-slate-800/50 to-slate-900/50 border border-purple-500/30 my-16 sm:my-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5 pointer-events-none" />
        <div className="text-center max-w-2xl mx-auto relative z-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tighter mb-4 sm:mb-6 text-white">
            Let's Work <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Together</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-400 mb-8">
            I'm always open to new opportunities and collaborations. Feel free to reach out!
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a
              href="mailto:nkemande@gmail.com"
              className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-slate-950 font-semibold rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all"
            >
              <Mail size={20} /> Send an Email
            </a>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 border border-purple-500/50 text-purple-400 font-semibold rounded-lg hover:bg-purple-500/10 hover:border-purple-400 transition-all"
            >
              Back to Portfolio <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
