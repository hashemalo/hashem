import Image from "next/image";
import type { ReactNode } from "react";

// Small set of typographic building blocks for blog posts, styled to sit on
// the paper background. Kept as plain components so posts stay readable JSX.

const link =
  "text-amber-900/80 underline decoration-amber-900/30 underline-offset-2 hover:decoration-amber-900/70 transition-colors";

export function A({ href, children }: { href: string; children: ReactNode }) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      className={link}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
    >
      {children}
    </a>
  );
}

export function H2({ children }: { children: ReactNode }) {
  return (
    <h2 className="font-serif text-2xl font-bold text-neutral-900 mt-10 mb-3">{children}</h2>
  );
}

export function H3({ children }: { children: ReactNode }) {
  return (
    <h3 className="font-serif text-lg font-bold text-neutral-900 mt-6 mb-2">{children}</h3>
  );
}

export function P({ children }: { children: ReactNode }) {
  return <p className="text-neutral-700 leading-relaxed mb-4">{children}</p>;
}

export function UL({ children }: { children: ReactNode }) {
  return (
    <ul className="list-disc pl-5 space-y-2 text-neutral-700 leading-relaxed mb-4 marker:text-neutral-400">
      {children}
    </ul>
  );
}

export function OL({ children }: { children: ReactNode }) {
  return (
    <ol className="list-decimal pl-5 space-y-2 text-neutral-700 leading-relaxed mb-4 marker:text-neutral-400">
      {children}
    </ol>
  );
}

export function Quote({ children }: { children: ReactNode }) {
  return (
    <blockquote className="border-l-2 border-stone-300 pl-4 my-2 text-sm text-neutral-500 italic leading-relaxed">
      {children}
    </blockquote>
  );
}

export function Fig({
  src,
  alt,
  width,
  height,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
}) {
  return (
    <figure className="my-6">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="w-full h-auto rounded-sm border border-stone-300/60 bg-white"
        sizes="(max-width: 672px) 100vw, 672px"
      />
    </figure>
  );
}
