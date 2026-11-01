import Link from "next/link";
import { posts, formatDate } from "@/lib/posts";

export default function Blog() {
  return (
    <main className="max-w-2xl mx-auto px-6 pb-24">
      <ul className="divide-y divide-stone-300/60">
        {posts.map((post) => (
          <li key={post.slug} className="py-5">
            <Link href={`/blog/${post.slug}`} className="group block">
              <p className="font-serif text-lg text-neutral-900 group-hover:text-amber-900 transition-colors">
                {post.title}
              </p>
              <p className="text-xs text-neutral-400 mt-1">{formatDate(post.date)}</p>
              <p className="text-sm text-neutral-600 mt-2 leading-relaxed">{post.summary}</p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
