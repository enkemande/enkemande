import React from 'react';
import Link from 'next/link';

export const mdxComponents = {
  h1: ({ children }: { children: React.ReactNode }) => (
    <h1 className="text-5xl sm:text-6xl font-bold tracking-[-.02em] mb-6">{children}</h1>
  ),
  h2: ({ children }: { children: React.ReactNode }) => (
    <h2 className="text-3xl font-bold mb-4 mt-8">{children}</h2>
  ),
  h3: ({ children }: { children: React.ReactNode }) => (
    <h3 className="text-xl font-bold mb-3 mt-6">{children}</h3>
  ),
  p: ({ children }: { children: React.ReactNode }) => (
    <p className="text-foreground/70 leading-relaxed text-lg mb-4">{children}</p>
  ),
  ul: ({ children }: { children: React.ReactNode }) => (
    <ul className="list-disc list-inside space-y-3 text-foreground/70 mb-4">{children}</ul>
  ),
  ol: ({ children }: { children: React.ReactNode }) => (
    <ol className="list-decimal list-inside space-y-3 text-foreground/70 mb-4">{children}</ol>
  ),
  li: ({ children }: { children: React.ReactNode }) => (
    <li className="ml-2">{children}</li>
  ),
  blockquote: ({ children }: { children: React.ReactNode }) => (
    <blockquote className="border-l-4 border-accent pl-4 italic text-foreground/70 my-4">
      {children}
    </blockquote>
  ),
  code: ({ children, className }: { children: React.ReactNode; className?: string }) => {
    if (className?.includes('language-')) {
      // Block code
      return (
        <code className={`${className} text-sm bg-slate-950/40 text-accent`}>
          {children}
        </code>
      );
    }
    // Inline code
    return (
      <code className="bg-slate-950/40 px-2 py-1 rounded text-accent text-sm">
        {children}
      </code>
    );
  },
  pre: ({ children }: { children: React.ReactNode }) => (
    <pre className="bg-slate-950/40 border border-accent/20 p-4 rounded-lg overflow-x-auto mb-4">
      {children}
    </pre>
  ),
  a: ({ href, children }: { href?: string; children: React.ReactNode }) => {
    // Use Next.js Link for internal routes, regular anchor for external URLs
    if (href?.startsWith('/')) {
      return (
        <Link href={href} className="text-accent hover:underline">
          {children}
        </Link>
      );
    }
    return (
      <a href={href} className="text-accent hover:underline" target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  },
  img: ({ src, alt }: { src?: string; alt?: string }) => (
    <img
      src={src}
      alt={alt}
      className="rounded-lg my-4 max-w-full h-auto"
    />
  ),
  table: ({ children }: { children: React.ReactNode }) => (
    <table className="w-full border-collapse border border-border/50 my-4">
      {children}
    </table>
  ),
  th: ({ children }: { children: React.ReactNode }) => (
    <th className="border border-border/50 px-4 py-2 text-left font-bold bg-slate-950/30">
      {children}
    </th>
  ),
  td: ({ children }: { children: React.ReactNode }) => (
    <td className="border border-border/50 px-4 py-2">{children}</td>
  ),
  hr: () => <hr className="my-8 border-border/50" />,
};
