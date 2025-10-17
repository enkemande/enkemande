'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, Linkedin, Github, Send, CheckCircle, ArrowRight } from 'lucide-react';
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

        <div className="flex flex-col gap-6 max-w-3xl relative">
          <div>
            <h1 className="font-mono text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tighter leading-tight mb-4 sm:mb-6">
              <span className="text-white">Get in</span>
              <br />
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Touch
              </span>
            </h1>
            <p className="font-sans text-base sm:text-lg text-slate-300 leading-relaxed">
              Have a project in mind or want to collaborate? I'd love to hear from you. Let's create something amazing together.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20 border-t border-slate-800 grid gap-12 md:grid-cols-3">
        {/* Contact Info */}
        <div className="md:col-span-1">
          <h2 className="text-2xl font-bold mb-8 text-white">Contact Information</h2>

          <div className="space-y-6">
            <div className="flex gap-4 items-start">
              <Mail className="text-cyan-400 flex-shrink-0 mt-1" size={24} />
              <div>
                <h3 className="font-semibold mb-1 text-white">Email</h3>
                <a
                  href="mailto:hello@nkemande.dev"
                  className="text-slate-400 hover:text-cyan-400 transition-colors break-all"
                >
                  hello@nkemande.dev
                </a>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <Linkedin className="text-cyan-400 flex-shrink-0 mt-1" size={24} />
              <div>
                <h3 className="font-semibold mb-1 text-white">LinkedIn</h3>
                <a
                  href="https://www.linkedin.com/in/edison-nkemande/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-cyan-400 transition-colors"
                >
                  edison-nkemande
                </a>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <Github className="text-cyan-400 flex-shrink-0 mt-1" size={24} />
              <div>
                <h3 className="font-semibold mb-1 text-white">GitHub</h3>
                <a
                  href="https://github.com/enkemande"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-cyan-400 transition-colors"
                >
                  enkemande
                </a>
              </div>
            </div>
          </div>

          <div className="mt-12 p-6 rounded-lg bg-gradient-to-br from-slate-900/50 to-slate-800/30 border border-slate-700/50">
            <h3 className="font-semibold mb-3 text-white">Response Time</h3>
            <p className="text-slate-400 text-sm">
              I typically respond to messages within 24-48 hours. For urgent matters, feel free to reach out via LinkedIn.
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="md:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2 text-slate-200">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-slate-900/50 border border-slate-700 focus:border-cyan-500 focus:outline-none transition-all text-white placeholder-slate-500"
                placeholder="Your name"
              />
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2 text-slate-200">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-slate-900/50 border border-slate-700 focus:border-cyan-500 focus:outline-none transition-all text-white placeholder-slate-500"
                placeholder="your.email@example.com"
              />
            </div>

            {/* Subject Field */}
            <div>
              <label htmlFor="subject" className="block text-sm font-medium mb-2 text-slate-200">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-slate-900/50 border border-slate-700 focus:border-cyan-500 focus:outline-none transition-all text-white placeholder-slate-500"
                placeholder="What is this about?"
              />
            </div>

            {/* Message Field */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2 text-slate-200">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-4 py-3 rounded-lg bg-slate-900/50 border border-slate-700 focus:border-cyan-500 focus:outline-none transition-all text-white placeholder-slate-500 resize-none"
                placeholder="Tell me about your project or inquiry..."
              />
            </div>

            {/* Status Messages */}
            {submitStatus === 'success' && (
              <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30 flex gap-3 items-start">
                <CheckCircle size={20} className="text-green-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-green-400 mb-1">Message sent!</h4>
                  <p className="text-sm text-green-400/80">
                    Thank you for reaching out. I'll get back to you as soon as possible.
                  </p>
                </div>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
                <p className="text-yellow-400 font-medium">
                  Something went wrong. Please try again or email me directly.
                </p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full inline-flex items-center justify-center gap-2 px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-slate-950 font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={20} />
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </section>

      {/* Alternative Contact */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20 rounded-lg bg-gradient-to-br from-slate-900/50 via-slate-800/50 to-slate-900/50 border border-cyan-500/30 my-16 sm:my-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5 pointer-events-none" />
        <div className="text-center max-w-2xl mx-auto relative z-10">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tighter mb-4 sm:mb-6 text-white">
            Prefer to <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Chat?</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-400 mb-8">
            Connect with me on social media or schedule a call if you'd like to discuss your project in detail.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a
              href="https://www.linkedin.com/in/edison-nkemande/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-slate-950 font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
            >
              <Linkedin size={20} /> Connect on LinkedIn
            </a>
            <a
              href="https://github.com/enkemande"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 border border-cyan-500/50 text-cyan-400 font-semibold rounded-lg hover:bg-cyan-500/10 hover:border-cyan-400 transition-all"
            >
              <Github size={20} /> View on GitHub
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
