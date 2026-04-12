import Link from "next/link";

export default function Milestone2() {
	return (
		<div className='flex min-h-screen flex-col items-center p-8 font-sans bg-[#fafafa] text-[#111111]'>
			<header className='mb-16 w-full max-w-2xl text-center'>
				<Link
					href='/blog'
					className='inline-block mb-8 text-sm font-bold uppercase tracking-widest hover:opacity-70 transition-opacity'>
					← Back to Blog
				</Link>
				<h1 className='text-5xl font-black uppercase tracking-tighter mb-4'>
					THE BLOG
				</h1>
				<div className='h-1 w-20 bg-black mx-auto'></div>
			</header>

			<main className='w-full max-w-2xl'>
				<article className='prose prose-neutral max-w-none'>
					<header className='mb-12'>
						<h2 className='text-4xl font-black uppercase tracking-tight mb-2'>
							Optimization,Refinements and Features: Milestone 2
						</h2>
						<div className='flex gap-4 items-center'>
							<p className='text-xs font-mono opacity-50 uppercase'>
								April 12, 2026
							</p>
							<span className='w-1 h-1 bg-black/20 rounded-full'></span>
							<p className='text-xs font-mono opacity-50 uppercase tracking-wider'>
								System Documentation
							</p>
						</div>
					</header>

					<div className='space-y-8 text-lg leading-relaxed'>
						<p>
							Through our mentor's feedback, we improve three parts as listed
							below:
						</p>

						<section className='space-y-4'>
							<h3 className='text-xl font-bold uppercase border-b-2 border-black pb-1 inline-block'>
								UI Overhaul
							</h3>
							<p>
								With the introduction of more metric and different form methods,
								we transitioned from a simple black and white theme to a more
								colourful theme inspired from apple's website.
							</p>
						</section>
						<section className='space-y-4'>
							<h3 className='text-xl font-bold uppercase border-b-2 border-black pb-1 inline-block'>
								Performance Improvements
							</h3>
							<p>
								Switch to better gemini model, the{" "}
								<strong>gemini-2.5-flash</strong> model, allowing for faster{" "}
								<strong>(by x6 times) </strong>
								response times . We also fine-tuned the model's parameters to
								allow for a more precise response and used gemini's tools to
								ensure better web search.
							</p>
						</section>

						<section className='space-y-4'>
							<h3 className='text-xl font-bold uppercase border-b-2 border-black pb-1 inline-block'>
								Transiton to Web-Forms
							</h3>
							<p>
								The previous method of Google Form's resulted in{" "}
								<strong>higher response times</strong> and bandwidth issues. We
								transitioned to better approach by using react to create
								Web-Based Forms that maintain the same parameters and allow
								greater UI control.
							</p>
						</section>

						<section className='space-y-4'>
							<h3 className='text-xl font-bold uppercase border-b-2 border-black pb-1 inline-block'>
								New Blog Secton
							</h3>
							<p>
								Added a Blog section that manifests each feature change, its
								reasoning , and our journey through it. Will be used to document
								the whole project from now on.
							</p>
						</section>

						<section className='space-y-4'>
							<h3 className='text-xl font-bold uppercase border-b-2 border-black pb-1 inline-block'>
								Credibility & Manipulation
							</h3>
							<p>
								We now added Credibility & Manipulation scores along with tags
								to give the user better insights.
							</p>
						</section>
					</div>

					<footer className='mt-16 pt-8 border-t border-black/10 text-center'>
						<p className='text-sm italic opacity-60'>
							Building a more truthful internet, one optimization at a time.
						</p>
					</footer>
				</article>
			</main>

			<footer className='mt-auto pt-16 flex flex-col items-center'>
				<Link
					href='/'
					className='flex items-center gap-2 px-6 py-3 border-2 border-black font-black uppercase text-sm hover:bg-black hover:text-white transition-all active:scale-95'>
					Check Truthify Now
				</Link>
			</footer>
		</div>
	);
}
