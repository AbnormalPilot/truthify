import Link from "next/link";
import { posts } from "./posts";

export default function BlogListing() {
  return (
    <div className="flex min-h-screen flex-col items-center p-8 font-sans bg-[#fafafa] text-[#111111]">
      <header className="mb-16 w-full max-w-2xl text-center">
        <Link href="/" className="inline-block mb-8 text-sm font-bold uppercase tracking-widest hover:opacity-70 transition-opacity">
          ← Back to Truthify
        </Link>
        <h1 className="text-5xl font-black uppercase tracking-tighter mb-4">The Blog</h1>
        <div className="h-1 w-20 bg-black mx-auto"></div>
      </header>

      <main className="w-full max-w-2xl">
        <div className="space-y-12">
          {posts.map((post) => (
            <article key={post.id} className="group relative border-b border-black/10 pb-12 last:border-0">
              <header className="mb-4">
                <Link href={`/blog/${post.id}`} className="block">
                  <h2 className="text-3xl font-black uppercase tracking-tight group-hover:underline cursor-pointer">
                    {post.title}
                  </h2>
                </Link>
                <div className="flex gap-4 items-center mt-2">
                  <p className="text-xs font-mono opacity-50 uppercase">{post.date}</p>
                  <span className="w-1 h-1 bg-black/20 rounded-full"></span>
                  <p className="text-xs font-mono opacity-50 uppercase tracking-wider">{post.category}</p>
                </div>
              </header>
              <p className="text-lg leading-relaxed opacity-70 mb-6">
                {post.summary}
              </p>
              <Link 
                href={`/blog/${post.id}`}
                className="inline-block text-xs font-black uppercase tracking-widest bg-black text-white px-4 py-2 hover:bg-[#333] transition-colors"
              >
                Read Article →
              </Link>
            </article>
          ))}
        </div>
      </main>

      <footer className="mt-auto pt-16 flex flex-col items-center">
        <Link 
          href="/"
          className="flex items-center gap-2 px-6 py-3 border-2 border-black font-black uppercase text-sm hover:bg-black hover:text-white transition-all active:scale-95"
        >
          Check Truthify Now
        </Link>
      </footer>
    </div>
  );
}
