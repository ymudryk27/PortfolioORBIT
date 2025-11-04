"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
const DICT = {
  en: {
    title: "Contact",
    intro:
      "Open to collaborations, internships, and creative tech projects. Usually reply within one hour.",
    email: "Email",
    phone: "Phone",
    sms: "(SMS only, please)",
    location: "Location",
    city: "Warsaw / Remote",
    tip: "Tip: A few lines about your idea or task are enough to start. Let’s build something cool.",
  },
  ua: {
    title: "Контакти",
    intro:
      "Відкритий до співпраці, стажувань і спільних проєктів. Зазвичай відповідаю протягом однієї години.",
    email: "Email",
    phone: "Телефон",
    sms: "(будь ласка, лише SMS)",
    location: "Місце",
    city: "Варшава / Remote",
    tip: "Порада: кілька рядків про ідею або задачу — достатньо, щоб почати.",
  },
  pl: {
    title: "Kontakt",
    intro:
      "Otwarty na współpracę, staże i wspólne projekty. Zazwyczaj odpowiadam w ciągu jednej godziny.",
    email: "Email",
    phone: "Telefon",
    sms: "(proszę tylko SMS)",
    location: "Lokalizacja",
    city: "Warszawa / Remote",
    tip: "Wskazówka: kilka zdań o pomyśle lub zadaniu wystarczy, by zacząć.",
  },
};
type Lang = keyof typeof DICT;

export default function Contact() {
  const [lang, setLang] = useState<Lang>("en");
  useEffect(() => {
    const saved = localStorage.getItem("lang");
    if (saved && (saved === "en" || saved === "ua" || saved === "pl"))
      setLang(saved as Lang);
  }, []);
  const t = DICT[lang];

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
        {t.title}
      </motion.h1>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="text-zinc-400 max-w-xl space-y-3 leading-relaxed"
      >
        <p>{t.intro}</p>
        <p>
          📧 <span className="text-zinc-200 font-semibold">{t.email}:</span>{" "}
          <a
            href="mailto:ymudrik2005@gmail.com"
            className="text-blue-400 hover:underline"
          >
            ymudrik2005@gmail.com
          </a>
        </p>
        <p>
          📱 <span className="text-zinc-200 font-semibold">{t.phone}:</span>{" "}
          <span className="text-zinc-300">731 165 362</span>{" "}
          <span className="italic text-zinc-500">{t.sms}</span>
        </p>
        <p>
          📍 <span className="text-zinc-200 font-semibold">{t.location}:</span>{" "}
          {t.city}
        </p>
        <p>
          💼 <span className="text-zinc-200 font-semibold">LinkedIn:</span>{" "}
          <a
            href="https://www.linkedin.com/in/yaroslavmudryk"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline"
          >
            www.linkedin.com/in/yaroslavmudryk
          </a>
        </p>
        <p>
          💻 <span className="text-zinc-200 font-semibold">GitHub:</span>{" "}
          <a
            href="https://github.com/ymudryk27"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline"
          >
            github.com/ymudryk27
          </a>
        </p>
        <p className="text-sm text-zinc-500 italic">{t.tip}</p>
      </motion.div>
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
    </main>
  );
}
