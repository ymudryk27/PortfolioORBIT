"use client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function About() {
  const router = useRouter();
  const [leaving, setLeaving] = useState(false);

  const handleBack = () => {
    if (leaving) return;
    setLeaving(true);
    setTimeout(() => {
      router.push("/");
    }, 260);
  };

  return (
    <motion.main
      className="min-h-screen flex flex-col items-center justify-center text-center bg-zinc-950 text-zinc-100"
      initial={{ opacity: 0, y: 16, scale: 0.98 }}
      animate={
        leaving
          ? { opacity: 0, y: 10, scale: 0.98 }
          : { opacity: 1, y: 0, scale: 1 }
      }
      exit={{ opacity: 0, y: -16, scale: 0.98 }}
      transition={{ duration: 0.26, ease: "easeOut" }}
    >
      {/* Back to Orbit floating button with animated leave */}
      <div className="fixed left-6 top-6 z-50">
        <motion.button
          type="button"
          onClick={handleBack}
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.25 }}
          className="flex items-center gap-2 rounded-full border border-zinc-700/60 bg-zinc-900/70 px-4 py-2 backdrop-blur text-zinc-200 hover:text-blue-300 hover:border-blue-400/70 shadow-[0_0_20px_rgba(56,189,248,0.15)]"
        >
          <span className="inline-block -translate-y-px">←</span>
          <span className="text-sm">Back to Orbit</span>
        </motion.button>
      </div>

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
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="text-zinc-400 max-w-xl mt-6"
      >
        Here you’ll find all my key projects — from Flask apps to AI tools and
        web animations.
      </motion.p>
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6 max-w-6xl">
        {/* ClientBook Project */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-xl border border-zinc-700/50 bg-zinc-900/60 p-6 backdrop-blur hover:border-blue-400/50 hover:shadow-[0_0_25px_rgba(56,189,248,0.2)] transition"
        >
          <h2 className="text-xl font-semibold text-blue-300 mb-2">
            ClientBook CRM
          </h2>
          <p className="text-zinc-400 text-sm mb-3">
            A mini CRM system built with{" "}
            <span className="text-blue-400">Flask</span> +{" "}
            <span className="text-blue-400">PostgreSQL</span> that allows adding
            and searching clients.
          </p>
          <a
            href="https://github.com/ymudryk27/ClientBook"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-400 hover:underline"
          >
            View on GitHub →
          </a>
        </motion.div>

        {/* OCR Tool */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="rounded-xl border border-zinc-700/50 bg-zinc-900/60 p-6 backdrop-blur hover:border-blue-400/50 hover:shadow-[0_0_25px_rgba(56,189,248,0.2)] transition"
        >
          <h2 className="text-xl font-semibold text-blue-300 mb-2">OCR Tool</h2>
          <p className="text-zinc-400 text-sm mb-3">
            <span className="text-blue-400">Python</span> +{" "}
            <span className="text-blue-400">Flask</span> application using{" "}
            <span className="text-blue-400">Tesseract</span> for automatic text
            recognition from images with export support.
          </p>
          <a
            href="https://github.com/ymudryk27/ai_images"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-400 hover:underline"
          >
            View on GitHub →
          </a>
        </motion.div>

        {/* Kickboxer Website */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="rounded-xl border border-zinc-700/50 bg-zinc-900/60 p-6 backdrop-blur hover:border-blue-400/50 hover:shadow-[0_0_25px_rgba(56,189,248,0.2)] transition"
        >
          <h2 className="text-xl font-semibold text-blue-300 mb-2">
            Kickboxing Champion Portfolio
          </h2>
          <p className="text-zinc-400 text-sm mb-3">
            A responsive personal website built with{" "}
            <span className="text-blue-400">HTML</span>,{" "}
            <span className="text-blue-400">CSS</span>, and{" "}
            <span className="text-blue-400">GSAP</span> animations for a world
            kickboxing champion.
          </p>
          <a
            href="https://ymudryk27.github.io/kickboxer_website/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-400 hover:underline"
          >
            View on GitHub →
          </a>
        </motion.div>

        {/* Traffic Sign Recognition Project */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="rounded-xl border border-zinc-700/50 bg-zinc-900/60 p-6 backdrop-blur hover:border-blue-400/50 hover:shadow-[0_0_25px_rgba(56,189,248,0.2)] transition"
        >
          <h2 className="text-xl font-semibold text-blue-300 mb-2">
            Traffic Sign Recognition (in development)
          </h2>
          <p className="text-zinc-400 text-sm mb-3">
            A machine learning project that uses a Convolutional Neural Network
            (CNN) trained on the German Traffic Sign Recognition Benchmark
            (GTSRB) dataset to classify road signs from images. Developed with{" "}
            <span className="text-blue-400">TensorFlow</span>,{" "}
            <span className="text-blue-400">Keras</span>,{" "}
            <span className="text-blue-400">NumPy</span>, and{" "}
            <span className="text-blue-400">Pandas</span>. Backend integration
            planned using <span className="text-blue-400">Flask</span> or{" "}
            <span className="text-blue-400">FastAPI</span>.
          </p>
          <a
            href="https://github.com/ymudryk27/traffic-sign-recognition"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-400 hover:underline"
          >
            View on GitHub →
          </a>
        </motion.div>
      </div>
    </motion.main>
  );
}
