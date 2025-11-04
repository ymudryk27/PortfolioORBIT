"use client";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
const DICT = {
  en: {
    title: "About Me",
    text: "I’m Yaroslav Mudryk, a Computer Science student at Vistula University in Warsaw. I enjoy creating practical and creative web projects using Python and modern web technologies. My focus is on building solutions that make technology simple, useful, and accessible for everyone. I also worked remotely at GLP Software as an IT assistant: built small websites for schools using basic HTML, CSS, and JavaScript; created a commercial website for a Polish kickboxing champion; helped the team hunt bugs on internal projects; and designed a website for a commercial company. Through every project, I try to connect logic, design, and curiosity to keep learning and improving as a developer.",
  },
  ua: {
    title: "Про мене",
    text: "Я — Ярослав Мудрик, студент комп’ютерних наук у Віслінському університеті у Варшаві. Люблю створювати практичні та креативні веб‑проєкти з використанням Python і сучасних вебтехнологій. Зосереджуюся на тому, щоб робити технології простими, корисними та доступними для кожного. Працював дистанційно в GLP Software у ролі IT‑помічника: робив невеликі сайти для шкіл на базовому HTML, CSS і JavaScript; створив комерційний сайт для польського чемпіона з кікбоксингу; допомагав команді шукати баги в їхніх проєктах; розробляв дизайн сайту для комерційної компанії. У кожному проєкті намагаюся поєднувати логіку, дизайн і цікавість, щоб постійно вдосконалюватися як розробник.",
  },
  pl: {
    title: "O mnie",
    text: "Jestem Yaroslav Mudryk, studentem informatyki na Uniwersytecie Vistula w Warszawie. Lubię tworzyć praktyczne i kreatywne projekty webowe z użyciem Pythona i nowoczesnych technologii. Skupiam się na rozwiązaniach, które sprawiają, że technologia jest prosta, użyteczna i dostępna dla każdego. Pracowałem zdalnie w GLP Software jako asystent IT: tworzyłem proste strony dla szkół w podstawowym HTML, CSS i JavaScript; przygotowałem komercyjną stronę dla polskiego mistrza kickboxingu; pomagałem zespołowi w wyszukiwaniu błędów w projektach; projektowałem stronę dla firmy komercyjnej. W każdym projekcie staram się łączyć logikę, design i ciekawość, aby stale rozwijać się jako programista.",
  },
};
type Lang = keyof typeof DICT;
const prefix = process.env.NEXT_PUBLIC_BASE_PATH || "";

const photos = ["avatar.png", "avatar2.png", "avatar3.png"];

import { useEffect, useRef, useState } from "react";

function Slideshow({ photos, prefix }: { photos: string[]; prefix: string }) {
  const [idx, setIdx] = useState(0);
  const [open, setOpen] = useState(false);
  const [pause, setPause] = useState(false);

  // auto-advance every 4s unless paused or modal open
  useEffect(() => {
    if (pause || open || photos.length <= 1) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % photos.length), 4000);
    return () => clearInterval(t);
  }, [pause, open, photos.length]);

  const current = photos[idx];

  return (
    <>
      <div
        className="relative mx-auto aspect-[4/3] w-3/4 overflow-hidden rounded-2xl border border-zinc-700/60 bg-zinc-900/70 shadow-[0_0_25px_rgba(56,189,248,0.25)]"
        onMouseEnter={() => setPause(true)}
        onMouseLeave={() => setPause(false)}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.img
            key={current}
            src={`${prefix}/tech/${current}`}
            alt={`photo-${idx + 1}`}
            className="h-full w-full object-cover cursor-pointer"
            onClick={() => setOpen(true)}
            onError={(e) => {
              const el = e.currentTarget as HTMLImageElement;
              el.src = `${prefix}/next.svg`;
            }}
            initial={{ opacity: 0, x: 30, scale: 0.98 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -30, scale: 0.98 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          />
        </AnimatePresence>
        {/* Prev/Next controls */}
        {photos.length > 1 && (
          <>
            <button
              aria-label="Previous photo"
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/40 px-3 py-2 text-zinc-100 hover:bg-black/60"
              onClick={() =>
                setIdx((i) => (i - 1 + photos.length) % photos.length)
              }
            >
              ‹
            </button>
            <button
              aria-label="Next photo"
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/40 px-3 py-2 text-zinc-100 hover:bg-black/60"
              onClick={() => setIdx((i) => (i + 1) % photos.length)}
            >
              ›
            </button>
          </>
        )}
        {/* Dots */}
        {photos.length > 1 && (
          <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-2">
            {photos.map((_, i) => (
              <span
                key={i}
                onClick={() => setIdx(i)}
                className={`h-2 w-2 rounded-full ${
                  i === idx ? "bg-blue-400" : "bg-zinc-500/60"
                } cursor-pointer`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Modal Gallery */}
      {open && (
        <GalleryModal
          photos={photos}
          prefix={prefix}
          startIndex={idx}
          onClose={() => setOpen(false)}
          onChange={(i) => setIdx(i)}
        />
      )}
    </>
  );
}

function GalleryModal({
  photos,
  prefix,
  startIndex = 0,
  onClose,
  onChange,
}: {
  photos: string[];
  prefix: string;
  startIndex?: number;
  onClose: () => void;
  onChange: (i: number) => void;
}) {
  const [i, setI] = useState(startIndex);
  const escListener = useRef<((e: KeyboardEvent) => void) | null>(null);

  useEffect(() => {
    escListener.current = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setI((v) => (v + 1) % photos.length);
      if (e.key === "ArrowLeft")
        setI((v) => (v - 1 + photos.length) % photos.length);
    };
    const fn = (e: KeyboardEvent) => escListener.current?.(e);
    document.addEventListener("keydown", fn);
    return () => document.removeEventListener("keydown", fn);
  }, [onClose, photos.length]);

  useEffect(() => {
    onChange(i);
  }, [i, onChange]);

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/85 p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <button
        className="absolute right-4 top-4 rounded-full bg-white/10 px-3 py-1 text-sm text-white hover:bg-white/20"
        onClick={onClose}
        aria-label="Close gallery"
      >
        Close
      </button>

      {/* Large image */}
      <div className="relative mb-4 flex max-h-[70vh] w-full max-w-5xl items-center justify-center">
        <button
          aria-label="Previous"
          className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/10 px-3 py-2 text-white hover:bg-white/20"
          onClick={() => setI((v) => (v - 1 + photos.length) % photos.length)}
        >
          ‹
        </button>
        <AnimatePresence mode="wait" initial={false}>
          <motion.img
            key={photos[i]}
            src={`${prefix}/tech/${photos[i]}`}
            alt={`large-${i + 1}`}
            className="max-h-[70vh] w-auto max-w-full rounded-lg border border-zinc-700 shadow-[0_0_40px_rgba(56,189,248,0.4)]"
            onError={(e) => {
              const el = e.currentTarget as HTMLImageElement;
              el.src = `${prefix}/next.svg`;
            }}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          />
        </AnimatePresence>
        <button
          aria-label="Next"
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/10 px-3 py-2 text-white hover:bg-white/20"
          onClick={() => setI((v) => (v + 1) % photos.length)}
        >
          ›
        </button>
      </div>

      {/* Thumbnails */}
      <div className="flex max-w-5xl flex-wrap items-center justify-center gap-3">
        {photos.map((name, idx) => (
          <img
            key={idx}
            src={`${prefix}/tech/${name}`}
            alt={`thumb-${idx + 1}`}
            className={`h-16 w-24 cursor-pointer rounded-md object-cover transition ${
              idx === i
                ? "ring-2 ring-blue-400"
                : "opacity-80 hover:opacity-100"
            }`}
            onClick={() => setI(idx)}
            onError={(e) => {
              const el = e.currentTarget as HTMLImageElement;
              el.src = `${prefix}/next.svg`;
            }}
          />
        ))}
      </div>
    </div>
  );
}
export default function About() {
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
        className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent"
      >
        {t.title}
      </motion.h1>
      {/* Avatar / Photos Slideshow with Click-to-Gallery */}
      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="mb-6 w-full max-w-2xl"
      >
        <Slideshow photos={photos} prefix={prefix} />
      </motion.div>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="text-zinc-400 max-w-xl"
      >
        {t.text}
      </motion.p>
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
