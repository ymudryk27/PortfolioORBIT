"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const prefix = process.env.NEXT_PUBLIC_BASE_PATH || "";

const DICT = {
  en: {
    title: "Resume",
    back: "Back to Orbit",
    summaryTitle: "Quick Summary",
    summary:
      "I’m a computer science student passionate about artificial intelligence and software that solves real problems. In 2025, I worked remotely at GLP Software, where I helped the team with web and testing tasks — from building small school websites in HTML/CSS/JS, to designing and improving layouts for commercial clients. I enjoy combining logic and creativity: automating things with Python and Flask, experimenting with AI tools, and learning how technology can make everyday life simpler.",
    downloadTitle: "Download CV",
    downloadHint: "Prefer a classic PDF? Grab it here:",
    cvEn: "Download English CV",
    cvPl: "Pobierz CV (PL)",
    cvUa: "Завантажити резюме (UA)",
    timelineTitle: "Timeline of Growth",
    skillsTitle: "Skills Galaxy",
    skillCore: "Core Stack",
    tagsTitle: "Tech Highlights",
    contactCta: "Need more details? Visit the Projects page or contact me.",
  },
  ua: {
    title: "Резюме",
    back: "Назад в Орбіту",
    summaryTitle: "Коротко про мене",
    summary:
      "Я студент комп’ютерних наук, якому справді цікаво поєднувати штучний інтелект і розробку корисних програм. У 2025 році я дистанційно працював у GLP Software, де допомагав команді з веб-розробкою та тестуванням — створював сайти для шкіл на HTML/CSS/JS, розробляв макети для комерційних клієнтів. Мені подобається поєднувати логіку та креативність: автоматизувати процеси за допомогою Python і Flask, працювати з AI, і робити технології простими для людей.",
    downloadTitle: "Завантажити CV",
    downloadHint: "Потрібна класична PDF‑версія? Ось тут:",
    cvEn: "Завантажити CV англійською",
    cvPl: "Pobierz CV (PL)",
    cvUa: "Завантажити резюме (UA)",
    timelineTitle: "Орбітальна хронологія",
    skillsTitle: "Галактика навичок",
    skillCore: "Основний стек",
    tagsTitle: "Технології",
    contactCta:
      "Потрібно більше деталей? Перегляньте Projects або напишіть мені.",
  },
  pl: {
    title: "CV",
    back: "Powrót do Orbity",
    summaryTitle: "Krótko o mnie",
    summary:
      "Jestem studentem informatyki, pasjonuję się sztuczną inteligencją i tworzeniem oprogramowania, które naprawdę pomaga. W 2025 roku pracowałem zdalnie w GLP Software, gdzie wspierałem zespół w zadaniach webowych i testowych — budowałem szkolne strony w HTML/CSS/JS i projektowałem układy dla klientów komercyjnych. Lubię łączyć logikę z kreatywnością: automatyzować procesy w Pythonie i Flasku, eksperymentować z AI i odkrywać, jak technologia może ułatwiać codzienność.",
    downloadTitle: "Pobierz CV",
    downloadHint: "Wolisz klasyczny PDF? Tutaj:",
    cvEn: "Pobierz CV (EN)",
    cvPl: "Pobierz CV (PL)",
    cvUa: "Pobierz CV (UA)",
    timelineTitle: "Oś czasu rozwoju",
    skillsTitle: "Galaktyka umiejętności",
    skillCore: "Główny stack",
    tagsTitle: "Technologie",
    contactCta:
      "Potrzebujesz więcej szczegółów? Zobacz Projects lub skontaktuj się.",
  },
} as const;

type Lang = keyof typeof DICT;

const TAGS = [
  "Python",
  "Flask",
  "FastAPI",
  "PostgreSQL",
  "Next.js",
  "React",
  "Tailwind",
  "HTML",
  "CSS",
  "JavaScript",
  "Tesseract OCR",
  "NumPy",
  "Pandas",
  "Figma",
  "Git/GitHub",
];

const SKILLS = [
  { label: "Python", value: 90 },
  { label: "Flask / FastAPI", value: 82 },
  { label: "TensorFlow / Keras (CNN)", value: 75 },
  { label: "PostgreSQL / SQL", value: 72 },
  { label: "QA Testing & Support", value: 72 },
  { label: "Git / CLI (Linux/Bash)", value: 70 },
  { label: "Communication & Docs", value: 80 },
];

const TIMELINE = [
  {
    year: "2025",
    textEn:
      "Traffic Sign Recognition (CNN on GTSRB), OCR Tool improvements, NeoOrbit portfolio.",
    textUa:
      "Розпізнавання дорожніх знаків (CNN на GTSRB), покращення OCR Tool, NeoOrbit‑портфоліо.",
    textPl:
      "Rozpoznawanie znaków drogowych (CNN na GTSRB), ulepszenia OCR Tool, portfolio NeoOrbit.",
  },
  {
    year: "2025",
    textEn:
      "Remote at GLP Software: school websites (HTML/CSS/JS), commercial kickboxer portfolio, bug‑hunting, basic UI design.",
    textUa:
      "Дистанційно в GLP Software: шкільні сайти (HTML/CSS/JS), комерційне портфоліо кікбоксера, пошук багів, базовий UI‑дизайн.",
    textPl:
      "Zdalnie w GLP Software: strony szkolne (HTML/CSS/JS), komercyjne portfolio kickboksera, bug‑hunting, podstawowy UI design.",
  },
  {
    year: "2022–Present",
    textEn:
      "Vistula University (CS, AI track). Coursework, team projects, and academic writing.",
    textUa:
      "Vistula University (CS, напрям AI). Курсові, командні проєкти та академічне письмо.",
    textPl:
      "Vistula University (CS, ścieżka AI). Projekty zespołowe i prace zaliczeniowe.",
  },
];

export default function Resume() {
  const [lang, setLang] = useState<Lang>("en");
  useEffect(() => {
    const saved = localStorage.getItem("lang");
    if (saved === "en" || saved === "ua" || saved === "pl")
      setLang(saved as Lang);
  }, []);
  const t = DICT[lang];

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 relative overflow-hidden">
      <Link href="/" aria-label={t.back}>
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
            <span className="text-sm">{t.back}</span>
          </motion.div>
        </div>
      </Link>

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

      <section className="max-w-6xl mx-auto px-4 pt-28 pb-16">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold mb-4 text-center bg-gradient-to-r from-red-400 to-pink-500 bg-clip-text text-transparent"
        >
          {t.title}
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="lg:col-span-2 rounded-2xl border border-zinc-700/60 bg-zinc-900/70 p-6 shadow-[0_0_30px_rgba(244,63,94,0.2)]"
          >
            <h2 className="text-xl font-semibold mb-3">{t.summaryTitle}</h2>
            <p className="text-zinc-300 leading-relaxed">{t.summary}</p>

            <h3 className="mt-6 text-sm uppercase tracking-wider text-zinc-400">
              {t.tagsTitle}
            </h3>
            <div className="mt-2 flex flex-wrap gap-2">
              {TAGS.map((x) => (
                <span
                  key={x}
                  className="px-3 py-1 rounded-full border border-pink-500/30 bg-pink-500/10 text-pink-200 text-xs"
                >
                  {x}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="rounded-2xl border border-zinc-700/60 bg-zinc-900/70 p-6 text-center shadow-[0_0_30px_rgba(244,63,94,0.2)]"
          >
            <h2 className="text-xl font-semibold mb-3">{t.downloadTitle}</h2>
            <p className="text-zinc-400 text-sm">{t.downloadHint}</p>
            <div className="mt-4 space-y-2">
              <a
                className="block rounded-full px-4 py-2 border border-blue-500/40 bg-blue-500/10 text-blue-200 hover:bg-blue-500/20 transition"
                href={`${prefix}/cv/Yaroslav_Mudryk_CV_EN.pdf`}
                download
              >
                {t.cvEn}
              </a>
              <a
                className="block rounded-full px-4 py-2 border border-blue-500/40 bg-blue-500/10 text-blue-200 hover:bg-blue-500/20 transition"
                href={`${prefix}/cv/Yaroslav_Mudryk_CV_PL.pdf`}
                download
              >
                {t.cvPl}
              </a>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-12 rounded-2xl border border-zinc-700/60 bg-zinc-900/70 p-6"
        >
          <h2 className="text-xl font-semibold mb-4">{t.timelineTitle}</h2>
          <div className="relative pl-6">
            <div className="absolute left-2 top-0 bottom-0 w-px bg-gradient-to-b from-red-400/50 to-pink-400/20" />
            <ul className="space-y-6">
              {TIMELINE.map((item) => {
                const text =
                  lang === "en"
                    ? item.textEn
                    : lang === "ua"
                    ? item.textUa
                    : item.textPl;
                return (
                  <li key={item.year} className="relative">
                    <span className="absolute -left-[7px] top-1 h-3 w-3 rounded-full bg-red-400 shadow-[0_0_12px_rgba(244,63,94,0.6)]" />
                    <div className="text-sm text-zinc-400">{item.year}</div>
                    <div className="text-zinc-200">{text}</div>
                  </li>
                );
              })}
            </ul>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.6 }}
          className="mt-8 rounded-2xl border border-zinc-700/60 bg-zinc-900/70 p-6"
        >
          <h2 className="text-xl font-semibold mb-4">{t.skillsTitle}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SKILLS.map((s, i) => (
              <div key={s.label}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-zinc-300">{s.label}</span>
                  <span className="text-xs text-zinc-500">{s.value}%</span>
                </div>
                <div className="h-2.5 rounded-full bg-zinc-800 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${s.value}%` }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.9, delay: i * 0.08 }}
                    className="h-full rounded-full bg-gradient-to-r from-red-400 to-pink-500"
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="text-center text-sm text-zinc-500 mt-4">
            {t.contactCta}
          </div>
        </motion.div>
      </section>
    </main>
  );
}
