import Link from "next/link";
import { posts } from "../posts";
import { notFound } from "next/navigation";

export default async function BlogPost({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = posts.find((p) => p.id === id);

  if (!post) {
    notFound();
  }

  return (
    <div className="flex min-h-screen flex-col items-center p-8 font-sans bg-[#fafafa] text-[#111111]">
      <header className="mb-16 w-full max-w-2xl text-center">
        <Link href="/blog" className="inline-block mb-8 text-sm font-bold uppercase tracking-widest hover:opacity-70 transition-opacity">
          ← Back to Blog
        </Link>
        <h1 className="text-5xl font-black uppercase tracking-tighter mb-4">The Blog</h1>
        <div className="h-1 w-20 bg-black mx-auto"></div>
      </header>

      <main className="w-full max-w-2xl">
        <article className="prose prose-neutral max-w-none">
          <header className="mb-12">
            <h2 className="text-4xl font-black uppercase tracking-tight mb-2">{post.title}</h2>
            <div className="flex gap-4 items-center">
              <p className="text-xs font-mono opacity-50 uppercase">{post.date}</p>
              <span className="w-1 h-1 bg-black/20 rounded-full"></span>
              <p className="text-xs font-mono opacity-50 uppercase tracking-wider">{post.category}</p>
            </div>
          </header>

          <div className="space-y-8 text-lg leading-relaxed">
            {id === "milestone-1" && (
              <>
                <div className="relative w-full aspect-[16/9] mb-12 border-2 border-black overflow-hidden rounded-lg">
                  <img 
                    src="/blog/milestone-1-banner.png" 
                    alt="Milestone 1 Analysis Pipeline" 
                    className="object-cover w-full h-full"
                  />
                </div>

                <p>
                  At Truthify, simplicity is our core principle, but under the hood, we employ a robust multi-stage pipeline 
                  to analyze potential misinformation. This post documents our <strong>Milestone 1</strong> analysis approach.
                </p>

                <section className="space-y-4">
                  <h3 className="text-xl font-bold uppercase border-b-2 border-black pb-1 inline-block">1. Automated Ingestion</h3>
                  <div className="my-6 border border-black/10 rounded-lg overflow-hidden bg-white p-4">
                    <img 
                      src="/blog/ingestion-flow.png" 
                      alt="Data Ingestion Visualization" 
                      className="w-full h-auto max-w-md mx-auto"
                    />
                  </div>
                  <p>
                    Every report submitted via our Truthify Form is immediately picked up by our automation engine. 
                    We track the <strong>Article Title</strong>, <strong>Article Content</strong>, and the <strong>Source URL</strong> 
                    to ensure we have the full context before analysis begins.
                  </p>
                </section>

                <section className="space-y-4">
                  <h3 className="text-xl font-bold uppercase border-b-2 border-black pb-1 inline-block">2. AI-Driven Heuristics</h3>
                  <div className="my-6 border border-black/10 rounded-lg overflow-hidden bg-black p-8">
                    <img 
                      src="/blog/ai-logic.png" 
                      alt="AI Analysis Logic" 
                      className="w-full h-auto max-w-md mx-auto invert"
                    />
                  </div>
                  <p>
                    We leverage Large Language Models (OpenAI GPT-4o) to perform a deep semantic analysis of the content. 
                    Instead of a simple "True/False" flag, our system evaluates the submission across several dimensions:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 font-medium">
                    <li><strong>Key Facts:</strong> Identifying the central claims made in the text.</li>
                    <li><strong>Emotional Tone:</strong> Monitoring for sensationalism or fear-mongering language.</li>
                    <li><strong>Bias Detection:</strong> Evaluating the neutrality of the reporting.</li>
                    <li><strong>Logical Issues:</strong> Identifying fallacies or inconsistencies in the argument.</li>
                  </ul>
                </section>

                <section className="space-y-4">
                  <h3 className="text-xl font-bold uppercase border-b-2 border-black pb-1 inline-block">3. Structured Results</h3>
                  <p>
                    Once the analysis is complete, the raw AI output is sanitized and formatted into a structured JSON object. 
                    This ensures that our data is machine-readable and ready for public transparency at any scale.
                  </p>
                </section>

                <section className="space-y-4">
                  <h3 className="text-xl font-bold uppercase border-b-2 border-black pb-1 inline-block">4. Permanent Audit Trail</h3>
                  <p>
                    All analyses are logged back into our master repository. This Milestone 1 architecture lays 
                     the groundwork for a more interactive verification system in the future.
                  </p>
                </section>
              </>
            )}
          </div>

          <footer className="mt-16 pt-8 border-t border-black/10 text-center">
            <p className="text-sm italic opacity-60">Building a more truthful internet, one report at a time.</p>
          </footer>
        </article>
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
