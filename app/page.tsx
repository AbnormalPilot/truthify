"use client";

import { useState } from "react";
import Link from "next/link";

interface AnalysisResult {
  verdict: string;
  confidence_score: number;
  key_facts: string;
  emotional_tone: string;
  manipulation_score: number;
  manipulation_tactics: string;
  bias_detected: string;
  logical_issues: string;
  source_credibility: string;
  credibility_score: number;
  red_flags: string;
  recommendation: string;
  headline: string;
  source: string;
}

function getVerdictStyle(verdict: string) {
  const v = (verdict ?? "").toUpperCase();
  if (v.includes("REAL")) return "text-green-700 bg-green-50 border-green-200";
  if (v.includes("FAKE")) return "text-red-700 bg-red-50 border-red-200";
  return "text-yellow-700 bg-yellow-50 border-yellow-200";
}

function getBarColor(score: number) {
  if (score >= 70) return "bg-green-500";
  if (score >= 40) return "bg-yellow-500";
  return "bg-red-500";
}

function getToneStyle(tone: string) {
  const t = (tone ?? "").toLowerCase();
  if (t.includes("neutral")) return "text-green-700 bg-green-50";
  if (t.includes("slightly")) return "text-blue-700 bg-blue-50";
  if (t.includes("moderately")) return "text-yellow-700 bg-yellow-50";
  return "text-red-700 bg-red-50";
}

export default function Home() {
  const [headline, setHeadline] = useState("");
  const [content, setContent] = useState("");
  const [source, setSource] = useState("");
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!headline.trim() && !content.trim()) return;

    setStatus("loading");
    setResult(null);
    setErrorMsg("");

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ headline, content, source }),
      });

      const data = await res.json();

      if (data.error) {
        setErrorMsg(data.error);
        setStatus("error");
        return;
      }

      setResult(data);
      setStatus("done");
    } catch {
      setErrorMsg("Failed to reach the analysis service. Please try again.");
      setStatus("error");
    }
  }

  function handleReset() {
    setHeadline("");
    setContent("");
    setSource("");
    setResult(null);
    setStatus("idle");
    setErrorMsg("");
  }

  const confidence = Number(result?.confidence_score ?? 0);
  const credibility = Number(result?.credibility_score ?? 0);
  const manipulation = Number(result?.manipulation_score ?? 0);

  return (
    <div className="flex min-h-screen flex-col items-center p-8 font-sans">
      <header className="mb-12 w-full max-w-xl text-center">
        <h1 className="text-5xl font-black uppercase tracking-tighter">Truthify</h1>
      </header>

      {/* Form */}
      {status !== "done" && (
        <section className="w-full max-w-2xl">
          <form onSubmit={handleSubmit} className="border-2 border-black rounded-lg bg-white overflow-hidden">
            <div className="p-6 space-y-4">
              <div>
                <label htmlFor="headline" className="block text-xs font-bold uppercase tracking-widest opacity-60 mb-2">
                  Article Title *
                </label>
                <input
                  id="headline"
                  type="text"
                  value={headline}
                  onChange={(e) => setHeadline(e.target.value)}
                  placeholder="Enter the headline or claim to verify"
                  className="w-full px-4 py-3 border-2 border-black/20 rounded-lg text-sm focus:border-black focus:outline-none transition-colors"
                  required
                  disabled={status === "loading"}
                />
              </div>
              <div>
                <label htmlFor="content" className="block text-xs font-bold uppercase tracking-widest opacity-60 mb-2">
                  Article Content *
                </label>
                <textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Paste the full article text here"
                  rows={6}
                  className="w-full px-4 py-3 border-2 border-black/20 rounded-lg text-sm focus:border-black focus:outline-none transition-colors resize-y"
                  required
                  disabled={status === "loading"}
                />
              </div>
              <div>
                <label htmlFor="source" className="block text-xs font-bold uppercase tracking-widest opacity-60 mb-2">
                  Source URL (optional)
                </label>
                <input
                  id="source"
                  type="url"
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                  placeholder="https://example.com/article"
                  className="w-full px-4 py-3 border-2 border-black/20 rounded-lg text-sm focus:border-black focus:outline-none transition-colors"
                  disabled={status === "loading"}
                />
              </div>
            </div>
            <div className="px-6 pb-6">
              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full py-3 bg-black text-white font-bold uppercase tracking-widest text-sm rounded-lg hover:bg-black/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === "loading" ? "Analyzing..." : "Analyze Article"}
              </button>
            </div>
          </form>
        </section>
      )}

      {/* Loading */}
      {status === "loading" && (
        <section className="w-full max-w-2xl mt-8">
          <div className="border-2 border-black rounded-lg p-8 bg-white text-center">
            <div className="inline-block w-8 h-8 border-3 border-black border-t-transparent rounded-full animate-spin mb-4" />
            <p className="font-bold text-lg">Analyzing your article...</p>
            <p className="text-sm opacity-50 mt-2">
              This usually takes 5-15 seconds
            </p>
          </div>
        </section>
      )}

      {/* Error */}
      {status === "error" && (
        <section className="w-full max-w-2xl mt-8">
          <div className="border-2 border-red-200 rounded-lg p-6 bg-red-50 text-center">
            <p className="text-sm text-red-700">{errorMsg}</p>
            <button
              onClick={() => setStatus("idle")}
              className="mt-4 px-6 py-2 text-xs font-bold uppercase tracking-widest border-2 border-red-300 rounded-lg hover:bg-red-100 transition-colors"
            >
              Try Again
            </button>
          </div>
        </section>
      )}

      {/* Analysis Results */}
      {status === "done" && result && (
        <section className="w-full max-w-2xl mt-0 mb-12">
          <div className="border-2 border-black rounded-lg overflow-hidden bg-white">
            {/* Verdict */}
            <div className={`p-6 border-b-2 border-black ${getVerdictStyle(result.verdict)}`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest opacity-60">Verdict</p>
                  <p className="text-3xl font-black uppercase tracking-tight mt-1">
                    {result.verdict}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold uppercase tracking-widest opacity-60">Confidence</p>
                  <p className="text-3xl font-black mt-1">{confidence}%</p>
                </div>
              </div>
              <div className="mt-4 h-2 bg-black/10 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${getBarColor(confidence)}`}
                  style={{ width: `${confidence}%` }}
                />
              </div>
            </div>

            {/* Article Info */}
            <div className="p-6 border-b border-black/10">
              <p className="text-xs font-bold uppercase tracking-widest opacity-40 mb-1">Article</p>
              <p className="font-bold text-lg">{result.headline}</p>
              {result.source && (
                <p className="text-sm opacity-50 mt-1 break-all">{result.source}</p>
              )}
            </div>

            {/* Key Facts */}
            {result.key_facts && (
              <div className="p-6 border-b border-black/10">
                <p className="text-xs font-bold uppercase tracking-widest opacity-40 mb-2">Key Facts</p>
                <p className="text-sm leading-relaxed">{result.key_facts}</p>
              </div>
            )}

            {/* Scores */}
            <div className="grid grid-cols-2 border-b border-black/10">
              <div className="p-6 border-r border-black/10">
                <p className="text-xs font-bold uppercase tracking-widest opacity-40 mb-1">Source Credibility</p>
                <p className="text-2xl font-black">{credibility}%</p>
                <p className="text-sm font-semibold uppercase mt-1 opacity-60">
                  {result.source_credibility}
                </p>
              </div>
              <div className="p-6">
                <p className="text-xs font-bold uppercase tracking-widest opacity-40 mb-1">Manipulation</p>
                <p className="text-2xl font-black">{manipulation}%</p>
                <span className={`inline-block mt-1 px-2 py-0.5 rounded text-xs font-bold ${getToneStyle(result.emotional_tone)}`}>
                  {result.emotional_tone}
                </span>
              </div>
            </div>

            {/* Details */}
            <div className="p-6 space-y-4">
              {result.bias_detected && result.bias_detected !== "none detected" && (
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest opacity-40 mb-1">Bias</p>
                  <p className="text-sm">{result.bias_detected}</p>
                </div>
              )}
              {result.manipulation_tactics && result.manipulation_tactics !== "none" && (
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest opacity-40 mb-1">Tactics</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {result.manipulation_tactics.split(",").map((t) => (
                      <span key={t.trim()} className="px-2 py-1 bg-red-50 text-red-700 text-xs font-semibold rounded">
                        {t.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {result.red_flags && result.red_flags !== "none" && (
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest opacity-40 mb-1">Red Flags</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {result.red_flags.split(",").map((f) => (
                      <span key={f.trim()} className="px-2 py-1 bg-yellow-50 text-yellow-700 text-xs font-semibold rounded">
                        {f.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Recommendation */}
            {result.recommendation && (
              <div className="p-6 bg-black/[0.02] border-t border-black/10">
                <p className="text-xs font-bold uppercase tracking-widest opacity-40 mb-2">Recommendation</p>
                <p className="text-sm font-medium leading-relaxed">{result.recommendation}</p>
              </div>
            )}

            {/* Disclaimer */}
            <div className="px-6 py-4 bg-black/[0.04] border-t border-black/10">
              <p className="text-xs opacity-40 text-center">
                AI-generated analysis. Always verify from multiple trusted sources.
              </p>
            </div>
          </div>

          {/* Analyze Another */}
          <button
            onClick={handleReset}
            className="w-full mt-4 py-3 border-2 border-black rounded-lg font-bold uppercase tracking-widest text-sm hover:bg-black hover:text-white transition-colors"
          >
            Analyze Another Article
          </button>
        </section>
      )}

      <footer className="mt-auto pt-16 flex flex-col items-center gap-6">
        <nav className="flex items-center gap-8">
          <Link
            href="/blog"
            className="text-sm font-black uppercase tracking-widest hover:opacity-50 transition-opacity"
          >
            Blog
          </Link>
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
        </nav>
      </footer>
    </div>
  );
}
