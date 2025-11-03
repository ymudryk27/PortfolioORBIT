"use client";

import Link from "next/link";
import Image from "next/image";
import avatar from "@/public/avatar.png";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type NavKey = "projects" | "about" | "contact" | "resume";

const BASE_ITEMS: { key: NavKey; href: string; angle: number }[] = [
  { key: "projects", href: "/projects", angle: -10 },
  { key: "about", href: "/about", angle: 80 },
  { key: "contact", href: "/contact", angle: 170 },
  { key: "resume", href: "/resume", angle: 260 },
];

const DICT = {
  en: {
    title: "My Orbital Portfolio",
    subtitle:
      "An interactive space where my projects, skills, and ideas revolve around real‑world problems. Pick a planet to explore.",
    nav: {
      projects: "Projects",
      about: "About",
      contact: "Contact",
      resume: "Resume",
    },
    guide: {
      title: "Planet meanings",
      projects: "Projects — main works",
      about: "About — who I am",
      contact: "Contact — get in touch",
      resume: "Resume — experience & skills",
    },
  },
  ua: {
    title: "Моє орбітальне портфоліо",
    subtitle:
      "Інтерактивний простір, де мої проєкти, навички та ідеї обертаються навколо реальних задач. Оберіть планету, щоб дослідити.",
    nav: {
      projects: "Проєкти",
      about: "Про мене",
      contact: "Контакти",
      resume: "Резюме",
    },
    guide: {
      title: "Планети означають",
      projects: "Проєкти — мої роботи",
      about: "Про мене — хто я",
      contact: "Контакти — зв’язатися",
      resume: "Резюме — досвід і навички",
    },
  },
  pl: {
    title: "Moje orbitalne portfolio",
    subtitle:
      "Interaktywna przestrzeń, w której moje projekty, umiejętności i pomysły krążą wokół realnych wyzwań. Wybierz planetę, aby zwiedzić.",
    nav: {
      projects: "Projekty",
      about: "O mnie",
      contact: "Kontakt",
      resume: "CV",
    },
    guide: {
      title: "Co znaczą planety",
      projects: "Projekty — moje prace",
      about: "O mnie — kim jestem",
      contact: "Kontakt — napisz do mnie",
      resume: "CV — doświadczenie i umiejętności",
    },
  },
} as const;

type Lang = keyof typeof DICT;

export default function Home() {
  const [lang, setLang] = useState<Lang>("en");
  const [guideOpen, setGuideOpen] = useState(false);

  const FLAG: Record<Lang, string> = { en: "🇬🇧", ua: "🇺🇦", pl: "🇵🇱" };

  useEffect(() => {
    try {
      const saved = localStorage.getItem("lang") as Lang | null;
      if (saved && ["en", "ua", "pl"].includes(saved)) setLang(saved as Lang);
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("lang", lang);
    } catch {}
  }, [lang]);

  const t = DICT[lang];
  const ITEMS = BASE_ITEMS.map((it) => ({
    ...it,
    label: t.nav[it.key],
  }));
  const [particles, setParticles] = useState<
    { x: number; y: number; delay: number; duration: number }[]
  >([]);
  useEffect(() => {
    const arr = Array.from({ length: 18 }, (_, i) => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: i * 0.3,
      duration: 6 + Math.random() * 4,
    }));
    setParticles(arr);
  }, []);

  const leftEyeRef = useRef<HTMLDivElement | null>(null);
  const rightEyeRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const eyes: (HTMLDivElement | null)[] = [
      leftEyeRef.current,
      rightEyeRef.current,
    ];

    const onMove = (e: MouseEvent) => {
      eyes.forEach((eye) => {
        if (!eye) return;
        const pupil = eye.querySelector<HTMLImageElement>(".pupil");
        if (!pupil) return;
        const r = eye.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        const ang = Math.atan2(dy, dx);
        const max = 5; // px
        const tx = Math.cos(ang) * max;
        const ty = Math.sin(ang) * max;
        pupil.style.transform = `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px))`;
      });
    };

    const onLeave = () => {
      eyes.forEach((eye) => {
        const pupil = eye?.querySelector<HTMLImageElement>(".pupil");
        if (pupil) pupil.style.transform = "translate(-50%,-50%)";
      });
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <main className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden bg-zinc-950 text-zinc-100">
      {/* Language Switcher */}
      <div className="fixed right-3 sm:right-6 top-[calc(env(safe-area-inset-top)+6px)] sm:top-6 z-50">
        <div className="flex items-center gap-1 rounded-full border border-zinc-700/60 bg-zinc-900/70 px-1.5 py-1 sm:px-2 backdrop-blur shadow-[0_0_16px_rgba(56,189,248,0.15)]">
          {(["en", "ua", "pl"] as Lang[]).map((code) => (
            <button
              key={code}
              onClick={() => setLang(code)}
              className={`flex items-center gap-1 text-xs px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full transition focus:outline-none focus:ring-2 focus:ring-blue-400/40 ${
                lang === code
                  ? "bg-blue-500/30 text-blue-100"
                  : "text-zinc-300 hover:text-white hover:bg-white/5"
              }`}
              aria-label={`Switch language to ${code.toUpperCase()}`}
              title={code.toUpperCase()}
            >
              <span className="text-[16px] sm:text-base leading-none">
                {FLAG[code]}
              </span>
              <span className="hidden sm:inline">{code.toUpperCase()}</span>
            </button>
          ))}
        </div>
      </div>
      {/* Info toggle — mobile only */}
      <button
        className="fixed left-3 top-[calc(env(safe-area-inset-top)+6px)] z-50 lg:hidden h-8 w-8 rounded-full bg-zinc-900/70 border border-zinc-700/60 backdrop-blur shadow-[0_0_12px_rgba(56,189,248,0.2)] text-zinc-200"
        aria-label="Toggle guide"
        aria-expanded={guideOpen}
        aria-controls="guide-panel"
        onClick={() => setGuideOpen((v) => !v)}
      >
        i
      </button>
      {/* Неоновий фон */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-transparent blur-3xl" />

      {/* Заголовок та опис (перемикається без накладання) */}
      <motion.div
        key={`hero-${lang}`}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="relative z-10 text-center px-4"
      >
        <h1 className="font-bold tracking-tight bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent text-[clamp(28px,7vw,56px)]">
          {t.title}
        </h1>
        <p className="mt-3 text-zinc-400 mx-auto max-w-xl text-[clamp(13px,3.6vw,18px)]">
          {t.subtitle}
        </p>
        <p className="mt-2 text-zinc-500 italic hidden sm:block text-[clamp(11px,3vw,14px)]">
          {lang === "ua" &&
            "(P.S. Фото не стежить за вами — це просто рядок коду 😄)"}
          {lang === "en" &&
            "(P.S. The photo isn’t watching you — it’s just a bit of code 😄)"}
          {lang === "pl" &&
            "(P.S. Zdjęcie nie śledzi Cię — to tylko kawałek kodu 😄)"}
        </p>
      </motion.div>

      {/* Guide panel — mobile (toggle) */}
      {guideOpen && (
        <div
          key={`guide-${lang}-mobile`}
          className="lg:hidden fixed left-1/2 top-[calc(env(safe-area-inset-top)+48px)] -translate-x-1/2 z-40 w-[92vw] max-w-[360px] text-sm text-zinc-300 space-y-2 bg-zinc-900/70 backdrop-blur-sm rounded-lg p-4 border border-zinc-700/40 shadow-[0_0_20px_rgba(56,189,248,0.2)]"
          id="guide-panel"
          onClick={() => setGuideOpen(false)}
        >
          <h2 className="text-zinc-100 font-semibold text-base mb-2">
            {t.guide.title}
          </h2>
          <ul className="space-y-1">
            <li>
              <span className="inline-block w-3 h-3 rounded-full bg-blue-500 mr-2" />
              {t.guide.projects}
            </li>
            <li>
              <span className="inline-block w-3 h-3 rounded-full bg-green-400 mr-2" />
              {t.guide.about}
            </li>
            <li>
              <span className="inline-block w-3 h-3 rounded-full bg-yellow-400 mr-2" />
              {t.guide.contact}
            </li>
            <li>
              <span className="inline-block w-3 h-3 rounded-full bg-pink-500 mr-2" />
              {t.guide.resume}
            </li>
          </ul>
        </div>
      )}
      {/* Guide panel — desktop (always visible) */}
      <div
        key={`guide-${lang}-desktop`}
        className="hidden lg:block absolute top-8 left-8 z-20 text-sm text-zinc-300 space-y-2 bg-zinc-900/70 backdrop-blur-sm rounded-lg p-4 border border-zinc-700/40 shadow-[0_0_20px_rgba(56,189,248,0.2)]"
      >
        <h2 className="text-zinc-100 font-semibold text-base mb-2">
          {t.guide.title}
        </h2>
        <ul className="space-y-1">
          <li>
            <span className="inline-block w-3 h-3 rounded-full bg-blue-500 mr-2" />
            {t.guide.projects}
          </li>
          <li>
            <span className="inline-block w-3 h-3 rounded-full bg-green-400 mr-2" />
            {t.guide.about}
          </li>
          <li>
            <span className="inline-block w-3 h-3 rounded-full bg-yellow-400 mr-2" />
            {t.guide.contact}
          </li>
          <li>
            <span className="inline-block w-3 h-3 rounded-full bg-pink-500 mr-2" />
            {t.guide.resume}
          </li>
        </ul>
      </div>

      {/* Сцена орбіти */}
      <div className="relative z-10 mt-8 sm:mt-12 w-[360px] h-[360px] md:w-[440px] md:h-[440px]">
        {/* Центральне фото */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="avatar-wrapper relative z-20 w-32 h-32 md:w-40 md:h-40 rounded-full ring-4 ring-blue-500/30 shadow-[0_0_80px_rgba(56,189,248,0.25)] overflow-hidden bg-white">
            {/* Avatar image (PNG with transparent eyes area if you have it) */}
            <Image
              src={avatar}
              alt="Yaroslav Mudryk"
              fill
              priority
              className="object-cover z-20"
            />

            {/* Eyes overlay (two separate sclera+pupil groups) */}
            <div className="pointer-events-none absolute inset-0 z-10">
              {/* Left eye */}
              <div
                ref={leftEyeRef}
                className="eye sclera absolute"
                style={{
                  left: "48%",
                  top: "37%",
                  width: "14px",
                  height: "14px",
                  transform: "translate(-50%,-50%)",
                }}
              >
                <div className="pupil absolute left-1/2 top-1/2 w-2.5 h-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-zinc-900" />
              </div>

              {/* Right eye */}
              <div
                ref={rightEyeRef}
                className="eye sclera absolute"
                style={{
                  left: "65%",
                  top: "37%",
                  width: "14px",
                  height: "14px",
                  transform: "translate(-50%,-50%)",
                }}
              >
                <div className="pupil absolute left-1/2 top-1/2 w-2.5 h-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-zinc-900" />
              </div>
            </div>
          </div>
        </div>

        {/* Кільця орбіти */}
        <div className="absolute inset-0 rounded-full border border-zinc-700/30" />
        <div className="absolute inset-6 rounded-full border border-zinc-700/20" />
        <div className="absolute inset-12 rounded-full border border-zinc-700/10" />

        {/* Обертання кнопок */}
        <motion.div
          className="absolute inset-0"
          animate={{ rotate: 360 }}
          transition={{ duration: 38, ease: "linear", repeat: Infinity }}
        >
          {ITEMS.map((item, i) => (
            <div
              key={item.label}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{
                transform: `translate(-50%, -50%) rotate(${
                  item.angle
                }deg) translateX(${
                  Math.min(440, 360) / 2 - 36
                }px) rotate(${-item.angle}deg)`,
              }}
            >
              <Link
                href={item.href}
                aria-label={item.label}
                title={item.label}
                className="group block w-10 h-10 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400/60"
              >
                <motion.div
                  className="relative w-10 h-10 rounded-full shadow-[0_0_20px_rgba(56,189,248,0.5)] cursor-pointer"
                  style={{
                    background: [
                      "radial-gradient(circle at 30% 30%, #60a5fa, #1e3a8a)", // blue
                      "radial-gradient(circle at 30% 30%, #34d399, #064e3b)", // green
                      "radial-gradient(circle at 30% 30%, #fbbf24, #78350f)", // yellow
                      "radial-gradient(circle at 30% 30%, #f472b6, #831843)", // pink
                    ][i],
                  }}
                  whileHover={{
                    scale: 1.2,
                    boxShadow: "0 0 40px rgba(255,255,255,0.6)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  animate={{ rotate: -360 }}
                  transition={{
                    duration: 38,
                    ease: "linear",
                    repeat: Infinity,
                  }}
                >
                  <span className="pointer-events-none absolute left-1/2 top-12 -translate-x-1/2 text-xs text-zinc-300 opacity-0 group-hover:opacity-100 transition">
                    {item.label}
                  </span>
                </motion.div>
              </Link>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Плаваючі неонові точки (генеруються лише на клієнті, щоб уникнути hydration mismatch) */}
      <div className="absolute w-full h-full overflow-hidden pointer-events-none">
        {particles.map((p, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 bg-blue-400/40 rounded-full"
            initial={{ x: `${p.x}%`, y: `${p.y}%`, opacity: 0 }}
            animate={{
              y: [`${p.y}%`, `${Math.random() * 100}%`],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: p.delay,
            }}
          />
        ))}
      </div>
    </main>
  );
}
