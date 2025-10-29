"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Contact() {
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
        className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent"
      >
        Contact
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="text-zinc-400 max-w-xl"
      >
        Get in touch via email:{" "}
        <a
          href="mailto:ymudrik2005@gmail.com"
          className="text-blue-400 hover:underline"
        >
          ymudrik2005@gmail.com
        </a>
      </motion.p>
    </main>
  );
}
