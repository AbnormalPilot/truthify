"use client";

import { useState } from "react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center p-8 font-sans">
      <header className="mb-12 w-full max-w-xl text-center">
        <h1 className="text-5xl font-black uppercase tracking-tighter">Truthify</h1>
      </header>

      <section className="w-full max-w-2xl">
        <div className="relative w-full aspect-[4/6] sm:aspect-[1/1] border-2 border-black bg-white overflow-hidden rounded-lg">
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLSePjSLw-x1Yj2YnGNaYnPBwtwTzr_xrj69kqefOU3odwMrUDQ/viewform?embedded=true"
            className="absolute inset-0 w-full h-full"
            frameBorder="0"
            marginHeight={0}
            marginWidth={0}
          >
            Loading…
          </iframe>
        </div>
      </section>

      <footer className="mt-auto pt-16 flex flex-col items-center">
        <a
          href="https://github.com/AbnormalPilot/truthify"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-black/5 transition-all duration-300 group"
        >
          <svg
            height="24"
            aria-hidden="true"
            viewBox="0 0 16 16"
            version="1.1"
            width="24"
            className="fill-current"
          >
            <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path>
          </svg>
          <span className="font-semibold text-sm tracking-tight">GitHub</span>
        </a>
      </footer>
    </div>
  );
}

