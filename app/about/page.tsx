"use client";
import { motion } from "framer-motion";
import Link from "next/link";
const prefix = process.env.NEXT_PUBLIC_BASE_PATH || "";
export default function About() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-center bg-zinc-950 text-zinc-100">
      <Link href="/" aria-label="Back to Orbit">
        <div className="fixed left-6 top-6 z-50">
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.25 }}
            className="flex items-center gap-2 rounded-full border border-zinc-700/60 bg-zinc-900/70 px-4 py-2 backdrop-blur text-zinc-200 hover:text-blue-300 hover:border-blue-400/70 shadow-[0_0_20px_rgba(56,189,248,0.15)]"
          >
            <span className="inline-block -translate-y-px">←</span>
            <span className="text-sm">Back to Orbit</span>
          </motion.div>
        </div>
      </Link>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent"
      >
        About Me
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="text-zinc-400 max-w-xl"
      >
        Hi! I’m Yaroslav Mudryk, a computer science student at Vistula
        University in Warsaw, passionate about Python, AI, and creative web
        development.
      </motion.p>
      {/* Scrolling photo strip */}
      <div className="fixed bottom-0 left-0 w-full z-40">
        <div className="relative overflow-hidden py-3">
          {/* subtle gray/white gradient stripe behind icons */}
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.06),rgba(255,255,255,0.12),rgba(255,255,255,0.06))]" />

          <div className="marquee">
            <div className="marquee__track">
              {(() => {
                const techs = [
                  "python",
                  "flask",
                  "fastapi",
                  "keras",
                  "numpy",
                  "pandas",
                  "postgresql",
                  "tensorflow",
                  "tailwind",
                  "github",
                  "vscode",
                ];
                // render 3 copies to guarantee seamless loop on wide screens
                return Array.from({ length: 3 }).map((_, copyIdx) => (
                  <div className="marquee__group" key={`group-${copyIdx}`}>
                    {techs.map((name, i) => (
                      <img
                        key={`${copyIdx}-${name}-${i}`}
                        src={`${prefix}/tech/${name}.svg`}
                        alt={name}
                        className="h-16 w-auto shrink-0 rounded-md opacity-90 hover:opacity-100 transition duration-300"
                        loading="lazy"
                        data-fallback="svg"
                        onError={(e) => {
                          const el = e.currentTarget as HTMLImageElement;
                          if (el.dataset.fallback === "svg") {
                            el.src = `${prefix}/tech/${name}.png`;
                            el.dataset.fallback = "png";
                          } else {
                            el.src = `${prefix}/next.svg`;
                          }
                        }}
                      />
                    ))}
                  </div>
                ));
              })()}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .marquee {
          position: relative;
          width: 100%;
          overflow: hidden;
        }
        .marquee__track {
          display: flex;
          width: max-content;
          will-change: transform;
          animation: marquee 28s linear infinite;
        }
        .marquee__group {
          display: inline-flex;
          align-items: center;
          gap: 1.5rem;
          padding: 0 1.5rem;
        }
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.3333%);
          }
        }
      `}</style>
    </main>
  );
}
