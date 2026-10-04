"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Github, Linkedin, Mail, FileText, X } from "lucide-react";

const navItems = [
  { href: "/", label: "About" },
  { href: "/cv", label: "CV" },
  { href: "/blog", label: "Blog" },
];

const socials = [
  { href: "https://github.com/hashemalo", label: "GitHub", icon: Github },
  { href: "https://linkedin.com/in/hashem-alomar", label: "LinkedIn", icon: Linkedin },
  { href: "https://x.com/hashalomar", label: "X", icon: X },
  { href: "mailto:halomar@terpmail.umd.edu", label: "Email", icon: Mail },
  { href: "/resume.pdf", label: "Resume", icon: FileText },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="max-w-2xl mx-auto px-6 pt-16 pb-10">
      <div className="flex flex-col items-center text-center gap-4">
        <Image
          src="/profile.jpg"
          alt="Hashem Alomar"
          width={160}
          height={160}
          className="rounded-full object-cover w-40 h-40"
          priority
        />
        <div>
          <h1 className="text-2xl font-serif font-medium text-neutral-900">
            Hashem Alomar
          </h1>
          <p className="text-sm text-neutral-500 mt-1">
            Computer Science &amp; Mathematics, University of Maryland
          </p>
        </div>

        <div className="flex items-center gap-4">
          {socials.map(({ href, label, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") || href.endsWith(".pdf") ? "_blank" : undefined}
              rel="noopener noreferrer"
              aria-label={label}
              className="text-neutral-400 hover:text-neutral-900 transition-colors"
            >
              <Icon className="w-4 h-4" />
            </a>
          ))}
        </div>

        <nav className="flex items-center gap-6 mt-2 text-sm">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`pb-1 border-b transition-colors ${
                  active
                    ? "border-neutral-900 text-neutral-900"
                    : "border-transparent text-neutral-400 hover:text-neutral-900"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
