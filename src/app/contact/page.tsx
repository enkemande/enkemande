'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, Linkedin, Github, Send, CheckCircle } from 'lucide-react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setSubmitStatus('idle'), 5000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-slate-900/5 dark:to-slate-900/50">
      <Header />

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 py-20 sm:py-32">
        <div className="flex flex-col gap-6 max-w-3xl">
          <div>
            <h1 className="font-sans text-5xl sm:text-6xl font-bold tracking-[-.02em] leading-tight mb-4">
              Get in <span className="text-accent">Touch</span>
            </h1>
            <p className="text-lg sm:text-xl text-foreground/70 leading-relaxed">
              Have a project in mind or want to collaborate? I'd love to hear from you. Let's create something amazing together.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-12 grid gap-12 md:grid-cols-3 md:py-20">
        {/* Contact Info */}
        <div className="md:col-span-1">
          <h2 className="text-2xl font-bold mb-8">Contact Information</h2>
          
          <div className="space-y-6">
            <div className="flex gap-4 items-start">
              <Mail className="text-accent flex-shrink-0 mt-1" size={24} />
              <div>
                <h3 className="font-semibold mb-1">Email</h3>
                <a
                  href="mailto:hello@nkemande.dev"
                  className="text-foreground/70 hover:text-accent transition-colors break-all"
                >
                  hello@nkemande.dev
                </a>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <Linkedin className="text-accent flex-shrink-0 mt-1" size={24} />
              <div>
                <h3 className="font-semibold mb-1">LinkedIn</h3>
                <a
                  href="https://www.linkedin.com/in/edison-nkemande/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground/70 hover:text-accent transition-colors"
                >
                  edison-nkemande
                </a>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <Github className="text-accent flex-shrink-0 mt-1" size={24} />
              <div>
                <h3 className="font-semibold mb-1">GitHub</h3>
                <a
                  href="https://github.com/enkemande"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground/70 hover:text-accent transition-colors"
                >
                  enkemande
                </a>
              </div>
            </div>
          </div>

          <div className="mt-12 p-6 rounded-xl bg-slate-950/30 dark:bg-slate-900/20 border border-border/50">
            <h3 className="font-semibold mb-3">Response Time</h3>
            <p className="text-foreground/70 text-sm">
              I typically respond to messages within 24-48 hours. For urgent matters, feel free to reach out via LinkedIn.
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="md:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-slate-950/30 dark:bg-slate-900/20 border border-border/50 focus:border-accent focus:outline-none transition-colors text-foreground placeholder-foreground/40"
                placeholder="Your name"
              />
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-slate-950/30 dark:bg-slate-900/20 border border-border/50 focus:border-accent focus:outline-none transition-colors text-foreground placeholder-foreground/40"
                placeholder="your.email@example.com"
              />
            </div>

            {/* Subject Field */}
            <div>
              <label htmlFor="subject" className="block text-sm font-medium mb-2">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-slate-950/30 dark:bg-slate-900/20 border border-border/50 focus:border-accent focus:outline-none transition-colors text-foreground placeholder-foreground/40"
                placeholder="What is this about?"
              />
            </div>

            {/* Message Field */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-4 py-3 rounded-lg bg-slate-950/30 dark:bg-slate-900/20 border border-border/50 focus:border-accent focus:outline-none transition-colors text-foreground placeholder-foreground/40 resize-none"
                placeholder="Tell me about your project or inquiry..."
              />
            </div>

            {/* Status Messages */}
            {submitStatus === 'success' && (
              <div className="p-4 rounded-lg bg-success/10 border border-success/30 flex gap-3 items-start">
                <CheckCircle size={20} className="text-success flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-success mb-1">Message sent!</h4>
                  <p className="text-sm text-success/80">
                    Thank you for reaching out. I'll get back to you as soon as possible.
                  </p>
                </div>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="p-4 rounded-lg bg-warning/10 border border-warning/30">
                <p className="text-warning font-medium">
                  Something went wrong. Please try again or email me directly.
                </p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full inline-flex items-center justify-center gap-2 px-8 py-3 bg-accent text-background rounded-lg font-medium hover:bg-accent-light transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={20} />
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </section>

      {/* Alternative Contact */}
      <section className="max-w-6xl mx-auto px-6 py-20 rounded-2xl bg-gradient-to-br from-accent/5 to-accent/10 border border-accent/20 my-20">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold tracking-[-.02em] mb-4">Prefer to Chat?</h2>
          <p className="text-foreground/70 mb-8">
            Connect with me on social media or schedule a call if you'd like to discuss your project in detail.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a
              href="https://www.linkedin.com/in/edison-nkemande/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-background rounded-full font-medium hover:bg-accent-light transition-all"
            >
              <Linkedin size={18} /> Connect on LinkedIn
            </a>
            <a
              href="https://github.com/enkemande"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-accent text-accent rounded-full font-medium hover:bg-accent hover:text-background transition-all"
            >
              <Github size={18} /> View on GitHub
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
