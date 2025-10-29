"use client";

import Link from "next/link";
import Image from "next/image";
import avatar from "@/public/avatar.png";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const ITEMS = [
  { label: "Projects", href: "/projects", angle: -10 },
  { label: "About", href: "/about", angle: 80 },
  { label: "Contact", href: "/contact", angle: 170 },
  { label: "Resume", href: "/resume", angle: 260 },
];

export default function Home() {
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
      {/* Неоновий фон */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-transparent blur-3xl" />

      {/* Заголовок та опис */}
      <div className="relative z-10 text-center px-4">
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent">
          NeoOrbit Hub
        </h1>
        <p className="mt-4 text-zinc-400 max-w-xl mx-auto">
          Welcome to my interactive portfolio — a space where ideas orbit around
          creativity and code. Explore projects, skills, and more.
        </p>
      </div>

      {/* Сцена орбіти */}
      <div className="relative z-10 mt-12 w-[360px] h-[360px] md:w-[440px] md:h-[440px]">
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
