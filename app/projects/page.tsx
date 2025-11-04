"use client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useEffect } from "react";

const DICT = {
  en: {
    title: "Projects",
    back: "Back to Orbit",
    p1: "This section presents a selection of my academic and personal projects that combine artificial intelligence, data processing, and web development.",
    p2: "Each project was designed to explore practical applications of Python, machine learning frameworks, and modern web technologies such as Flask, FastAPI, and Tailwind CSS. Together, they demonstrate my interest in connecting scientific methods with creative coding to develop intelligent, efficient, and user-friendly digital tools.",
    view: "View on GitHub →",
    cards: {
      client: {
        title: "ClientBook CRM",
        desc: "A mini CRM system built with Flask + PostgreSQL that allows adding and searching clients.",
      },
      ocr: {
        title: "OCR Tool",
        desc: "Python + Flask application using Tesseract for automatic text recognition from images with export support.",
      },
      kick: {
        title: "Kickboxing Champion Portfolio",
        desc: "A responsive personal website built with HTML, CSS, and GSAP animations for a world kickboxing champion.",
      },
      tsr: {
        title: "Traffic Sign Recognition (in development)",
        desc: "A machine learning project that uses a CNN trained on the GTSRB dataset to classify road signs from images. Developed with TensorFlow, Keras, NumPy, and Pandas. Backend integration planned using Flask or FastAPI.",
      },
    },
  },
  ua: {
    title: "Проєкти",
    back: "Назад в Орбіту",
    p1: "У цьому розділі зібрані мої навчальні й особисті проєкти, що поєднують штучний інтелект, обробку даних і веб‑розробку.",
    p2: "Кожен проєкт створено, щоб дослідити практичні застосування Python, фреймворків машинного навчання та сучасних веб‑технологій, як‑от Flask, FastAPI і Tailwind CSS. Разом вони показують моє прагнення поєднувати наукові підходи з креативним кодом для створення розумних, ефективних і зручних інструментів.",
    view: "Переглянути на GitHub →",
    cards: {
      client: {
        title: "ClientBook CRM",
        desc: "Міні‑CRM на Flask + PostgreSQL з можливістю додавання та пошуку клієнтів.",
      },
      ocr: {
        title: "OCR Tool",
        desc: "Застосунок на Python + Flask із Tesseract для автоматичного розпізнавання тексту на зображеннях та експорту результатів.",
      },
      kick: {
        title: "Портфоліо чемпіона з кікбоксингу",
        desc: "Адаптивний сайт на HTML, CSS і анімаціях GSAP для чемпіона світу з кікбоксингу.",
      },
      tsr: {
        title: "Розпізнавання дорожніх знаків (у розробці)",
        desc: "ML‑проєкт із CNN, навченою на датасеті GTSRB, для класифікації знаків на зображеннях. Використано TensorFlow, Keras, NumPy і Pandas. Планується бекенд на Flask або FastAPI.",
      },
    },
  },
  pl: {
    title: "Projekty",
    back: "Powrót do Orbity",
    p1: "Ta sekcja przedstawia wybrane projekty naukowe i prywatne, łączące sztuczną inteligencję, przetwarzanie danych oraz web‑development.",
    p2: "Każdy projekt został zaprojektowany, aby zbadać praktyczne zastosowania Pythona, frameworków uczenia maszynowego i nowoczesnych technologii webowych, takich jak Flask, FastAPI i Tailwind CSS. Razem pokazują moje dążenie do łączenia metod naukowych z kreatywnym kodowaniem, aby tworzyć inteligentne, wydajne i przyjazne narzędzia.",
    view: "Zobacz na GitHub →",
    cards: {
      client: {
        title: "ClientBook CRM",
        desc: "Mini‑CRM zbudowany w Flask + PostgreSQL z dodawaniem i wyszukiwaniem klientów.",
      },
      ocr: {
        title: "OCR Tool",
        desc: "Aplikacja Python + Flask z Tesseract do automatycznego rozpoznawania tekstu na obrazach z eksportem wyników.",
      },
      kick: {
        title: "Portfolio mistrza kickboxingu",
        desc: "Responsywna strona w HTML, CSS i animacjami GSAP dla mistrza świata w kickboxingu.",
      },
      tsr: {
        title: "Rozpoznawanie znaków drogowych (w trakcie)",
        desc: "Projekt ML z siecią CNN uczoną na GTSRB do klasyfikacji znaków na obrazach. Użyto TensorFlow, Keras, NumPy i Pandas. Backend planowany w Flask lub FastAPI.",
      },
    },
  },
} as const;
type Lang = keyof typeof DICT;

const prefix = process.env.NEXT_PUBLIC_BASE_PATH || "";

// --- Highlight tech names in paragraphs and card descriptions ---
const TECH_WORDS = [
  "Python",
  "Flask",
  "FastAPI",
  "Tailwind CSS",
  "PostgreSQL",
  "Tesseract",
  "HTML",
  "CSS",
  "GSAP",
  "TensorFlow",
  "Keras",
  "NumPy",
  "Pandas",
  "CNN",
  "GTSRB",
] as const;

function highlightTech(text: string) {
  // Split text on any tech word and keep the delimiters
  const escaped = TECH_WORDS.map((w) =>
    w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
  );
  const re = new RegExp(`(\\b(?:${escaped.join("|")})\\b)`, "g");
  const parts = text.split(re);
  return parts.map((part, i) =>
    TECH_WORDS.includes(part as any) ? (
      <span key={i} className="text-blue-400">
        {part}
      </span>
    ) : (
      part
    )
  );
}

export default function About() {
  const router = useRouter();
  const [leaving, setLeaving] = useState(false);
  const [lang, setLang] = useState<Lang>("en");
  useEffect(() => {
    const saved = localStorage.getItem("lang");
    if (saved && (saved === "en" || saved === "ua" || saved === "pl"))
      setLang(saved as Lang);
  }, []);
  const t = DICT[lang];

  const icons = [
    "python",
    "flask",
    "fastapi",
    "keras",
    "numpy",
    "pandas",
    "tailwind",
    "github",
    "vscode",
    "postgresql",
    "tensorflow",
  ];
  const marqueeIcons = [...icons, ...icons, ...icons, ...icons];

  const handleBack = () => {
    if (leaving) return;
    setLeaving(true);
    setTimeout(() => {
      router.push("/");
    }, 260);
  };

  return (
    <motion.main
      className="min-h-screen flex flex-col items-center justify-center text-center bg-zinc-950 text-zinc-100 pb-48"
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
          <span className="text-sm">{t.back}</span>
        </motion.button>
      </div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
      >
        {t.title}
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="text-zinc-400 max-w-xl"
      >
        {highlightTech(t.p1)}
      </motion.p>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="text-zinc-400 max-w-xl mt-6"
      >
        {highlightTech(t.p2)}
      </motion.p>
      <div className="mt-12 mb-32 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6 max-w-6xl">
        {/* ClientBook Project */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-xl border border-zinc-700/50 bg-zinc-900/60 p-6 backdrop-blur hover:border-blue-400/50 hover:shadow-[0_0_25px_rgba(56,189,248,0.2)] transition"
        >
          <h2 className="text-xl font-semibold text-blue-300 mb-2">
            {t.cards.client.title}
          </h2>
          <p className="text-zinc-400 text-sm mb-3">
            {highlightTech(t.cards.client.desc)}
          </p>
          <a
            href="https://github.com/ymudryk27/ClientBook"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-400 hover:underline"
          >
            {t.view}
          </a>
        </motion.div>

        {/* OCR Tool */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="rounded-xl border border-zinc-700/50 bg-zinc-900/60 p-6 backdrop-blur hover:border-blue-400/50 hover:shadow-[0_0_25px_rgba(56,189,248,0.2)] transition"
        >
          <h2 className="text-xl font-semibold text-blue-300 mb-2">
            {t.cards.ocr.title}
          </h2>
          <p className="text-zinc-400 text-sm mb-3">
            {highlightTech(t.cards.ocr.desc)}
          </p>
          <a
            href="https://github.com/ymudryk27/ai_images"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-400 hover:underline"
          >
            {t.view}
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
            {t.cards.kick.title}
          </h2>
          <p className="text-zinc-400 text-sm mb-3">
            {highlightTech(t.cards.kick.desc)}
          </p>
          <a
            href="https://ymudryk27.github.io/kickboxer_website/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-400 hover:underline"
          >
            {t.view}
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
            {t.cards.tsr.title}
          </h2>
          <p className="text-zinc-400 text-sm mb-3">
            {highlightTech(t.cards.tsr.desc)}
          </p>
          <a
            href="https://github.com/ymudryk27/traffic-sign-recognition"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-400 hover:underline"
          >
            {t.view}
          </a>
        </motion.div>
      </div>
      {/* Scrolling Tech Icons Strip — seamless, single-track (true infinite) */}
      <div className="pointer-events-none fixed bottom-0 left-0 z-40 w-full h-16 bg-gradient-to-r from-zinc-800/90 via-zinc-700/80 to-zinc-800/90 py-1.5 backdrop-blur-md">
        <div
          className="relative h-full overflow-hidden"
          style={{
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
            maskImage:
              "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          }}
        >
          {/* Single extra-wide track duplicated inline to avoid any visible jump */}
          <div className="marquee-track absolute left-0 top-1/2 -translate-y-1/2 inline-flex items-center gap-6 px-6 whitespace-nowrap will-change-transform">
            {marqueeIcons.map((tech, i) => (
              <img
                key={`m-a-${i}`}
                src={`${prefix}/tech/${tech}.svg`}
                alt={tech}
                className="h-12 w-auto opacity-95 mx-2"
              />
            ))}
            {marqueeIcons.map((tech, i) => (
              <img
                key={`m-b-${i}`}
                src={`${prefix}/tech/${tech}.svg`}
                alt={`${tech}-dup`}
                className="h-12 w-auto opacity-95 mx-2"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Local styles for the marquee to ensure a truly seamless loop */}
      <style jsx global>{`
        @keyframes neo-marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
        .marquee-track {
          /* The track contains two identical halves; moving by -50% creates a perfect loop */
          animation: neo-marquee 40s linear infinite;
        }
        /* Pause on hover (optional, feels nicer on desktop) */
        .marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="fixed right-6 top-6 z-50">
        <div className="flex items-center gap-1 rounded-full border border-zinc-700/60 bg-zinc-900/70 px-2 py-1 backdrop-blur shadow-[0_0_16px_rgba(56,189,248,0.15)]">
          {(["en", "ua", "pl"] as Lang[]).map((code) => (
            <button
              key={code}
              onClick={() => {
                setLang(code);
                localStorage.setItem("lang", code);
              }}
              className={`flex items-center gap-1 text-xs px-2 py-1 rounded-full transition focus:outline-none focus:ring-2 focus:ring-blue-400/40 ${
                lang === code
                  ? "bg-blue-500/30 text-blue-100"
                  : "text-zinc-300 hover:text-white hover:bg-white/5"
              }`}
              aria-label={`Switch language to ${code.toUpperCase()}`}
              title={code.toUpperCase()}
            >
              <span className="text-base leading-none">
                {code === "en" ? "🇬🇧" : code === "ua" ? "🇺🇦" : "🇵🇱"}
              </span>
              <span className="hidden sm:inline">{code.toUpperCase()}</span>
            </button>
          ))}
        </div>
      </div>
    </motion.main>
  );
}
