import Link from 'next/link';
import { ArrowRight, Download, Mail, Phone, MapPin, ExternalLink } from 'lucide-react';
import { SKILLS } from '@/lib/skills';
import { EXPERIENCE, EDUCATION, CERTIFICATIONS } from '@/lib/resume';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export default function ResumePage() {

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-slate-900/5 dark:to-slate-900/50">
      {/* Navigation */}
    <Header />

      {/* Header Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="flex flex-col gap-8">
          <div>
            <h1 className="font-sans text-5xl sm:text-6xl font-bold tracking-[-.02em] leading-tight mb-2">
              Edison Nkemande
            </h1>
            <p className="text-2xl text-accent font-semibold mb-6">
              Senior Software Engineer | Cloud Solutions Architect
            </p>
            <p className="text-lg text-foreground/70 leading-relaxed max-w-2xl">
              Innovative and results-driven Senior Software Engineer with 8+ years of experience building scalable web and mobile applications across fintech, payments, and service platforms. Adept at architecting full-stack solutions using Flutter, React/Expo, Firebase, and Node.js, with a strong focus on clean architecture, domain-driven design, and developer mentorship. Passionate about building impactful products that combine strong engineering, modern UI/UX, and business value.
            </p>
          </div>

          <div className="flex flex-wrap gap-6 pt-4">
            <div className="flex items-center gap-2 text-foreground/70">
              <Mail size={20} className="text-accent" />
              <a href="mailto:nkemande@gmail.com" className="hover:text-accent transition-colors">
                hello@nkemande.dev
              </a>
            </div>
            {/* <div className="flex items-center gap-2 text-foreground/70">
              <Phone size={20} className="text-accent" />
              <a href="tel:+17137051803" className="hover:text-accent transition-colors">
                +1 (713) 705-1803
              </a>
            </div> */}
            <div className="flex items-center gap-2 text-foreground/70">
              <MapPin size={20} className="text-accent" />
              <span>Missouri City, Texas</span>
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <a
              href="/resume-edison-nkemande.pdf"
              download
              className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-background rounded-full font-medium hover:bg-accent-light transition-all hover:gap-3"
            >
              <Download size={20} /> Download PDF
            </a>
            <a
              href="https://github.com/enkemande"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 border border-border rounded-full font-medium hover:border-accent hover:text-accent transition-all"
            >
              GitHub <ExternalLink size={18} />
            </a>
          </div>
        </div>
      </section>

      {/* Professional Experience */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 border-t border-border/50">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-[-.02em] mb-12">Professional Experience</h2>

        <div className="space-y-12">
          {EXPERIENCE.map((job, index) => (
            <div key={index} className="relative pl-8 border-l-2 border-accent/30 hover:border-accent/60 transition-colors">
              <div className="absolute -left-3 top-0 w-6 h-6 bg-accent rounded-full" />

              <div className="mb-4">
                <h3 className="text-2xl font-bold mb-1">{job.title}</h3>
                <p className="text-lg text-accent font-semibold mb-2">{job.company}</p>
                <div className="flex flex-wrap gap-4 text-sm text-foreground/60">
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
                  <li key={i} className="text-foreground/70 leading-relaxed flex gap-3">
                    <span className="text-accent mt-1">▸</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 border-t border-border/50">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-[-.02em] mb-12">Technical Skills</h2>

        <div className="grid gap-8 md:grid-cols-2">
          {SKILLS.map((skillGroup) => (
            <div key={skillGroup.category} className="p-6 rounded-xl bg-slate-950/30 dark:bg-slate-900/20 border border-border/50">
              <h3 className="font-bold text-lg mb-4 text-accent">{skillGroup.category}</h3>
              <div className="flex flex-wrap gap-2">
                {skillGroup.items.map((skill) => (
                  <span
                    key={skill}
                    className="text-sm px-3 py-1 rounded-full bg-foreground/5 border border-border/50 hover:border-accent/50 transition-all"
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
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 border-t border-border/50">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-[-.02em] mb-12">Certifications</h2>

        <div className="space-y-4">
          {CERTIFICATIONS.map((cert, index) => (
            <a
              key={index}
              href={cert.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-6 rounded-xl border border-border/50 hover:border-accent/50 bg-slate-950/30 dark:bg-slate-900/20 transition-all hover:shadow-lg hover:shadow-accent/10 flex items-start justify-between"
            >
              <div>
                <h3 className="text-lg font-bold mb-1 group-hover:text-accent transition-colors">{cert.name}</h3>
                <p className="text-foreground/60 mb-2">{cert.issuer}</p>
                <span className="text-sm text-foreground/50">{cert.date}</span>
              </div>
              <ExternalLink size={20} className="text-foreground/40 group-hover:text-accent transition-colors flex-shrink-0" />
            </a>
          ))}
        </div>
      </section>

      {/* Education */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 border-t border-border/50">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-[-.02em] mb-12">Education</h2>

        <div className="space-y-6">
          {EDUCATION.map((edu, index) => (
            <div key={index} className="p-6 rounded-xl bg-slate-950/30 dark:bg-slate-900/20 border border-border/50">
              <h3 className="text-xl font-bold mb-2">{edu.degree}</h3>
              <p className="text-lg text-accent font-semibold mb-2">{edu.school}</p>
              <p className="text-foreground/70 mb-3">{edu.details}</p>
              <div className="flex flex-wrap gap-6 text-sm text-foreground/60">
                <span>Graduated: {edu.graduation}</span>
                <span>•</span>
                <span>GPA: {edu.gpa}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 rounded-2xl bg-gradient-to-br from-accent/5 to-accent/10 border border-accent/20 my-16">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-[-.02em] mb-6">Interested in Working Together?</h2>
          <p className="text-lg text-foreground/70 mb-8">
            I'm always open to new opportunities and collaborations. Feel free to reach out!
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a
              href="mailto:nkemande@gmail.com"
              target='_top'
              className="inline-flex items-center gap-2 px-8 py-3 bg-accent text-background rounded-full font-medium hover:bg-accent-light transition-all"
            >
              <Mail size={20} /> Send an Email
            </a>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-8 py-3 border-2 border-accent text-accent rounded-full font-medium hover:bg-accent hover:text-background transition-all"
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
