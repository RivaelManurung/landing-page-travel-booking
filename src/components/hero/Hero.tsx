"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Star } from "lucide-react";
import SearchBar from "./SearchBar";
import FeatureBadges from "./FeatureBadges";
import { fadeUp, wordReveal, stagger, easeExpo } from "@/lib/motion";

const HEADLINE = ["Find", "Your", "Perfect", "Stay"];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Parallax: image drifts slower & zooms slightly as you scroll
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.06, 1.16]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);
  const scrimOpacity = useTransform(scrollYProgress, [0, 1], [0.32, 0.62]);

  return (
    <section
      ref={ref}
      className="relative isolate z-30 min-h-[100svh] w-full pb-24 pt-28 sm:pt-32"
    >
      {/* Background stack — clipped here (NOT on the section) so popovers can
          overflow the hero without being cut off */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          style={{ y: imageY, scale: imageScale }}
          className="absolute inset-0"
        >
          <Image
            src="/hero-santorini.jpg"
            alt="Whitewashed cliffside village of Oia, Santorini at golden hour"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </motion.div>

        {/* 1 · light top/bottom scrim (animated) so nav + search stay legible */}
        <motion.div
          style={{ opacity: scrimOpacity }}
          className="absolute inset-0 bg-gradient-to-b from-ink/70 via-transparent to-ink/50"
        />
        {/* 2 · soft centered vignette behind the headline for contrast */}
        <div className="absolute inset-0 bg-[radial-gradient(78%_62%_at_50%_40%,rgba(17,47,66,0.45),transparent_72%)]" />
        {/* 3 · fade into the warm paper base so the next section blends seamlessly */}
        <div className="absolute inset-x-0 bottom-0 h-72 bg-gradient-to-t from-[#faf6ef] via-[#faf6ef]/70 to-transparent" />
      </div>

      {/* floating decorative rating chip */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.8, ease: easeExpo }}
        className="absolute right-6 top-28 z-10 hidden lg:block"
      >
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="glass flex items-center gap-3 rounded-2xl border border-white/50 px-4 py-3 shadow-float"
        >
          <div className="flex -space-x-2">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className={`h-8 w-8 rounded-full border-2 border-white ${
                  ["bg-ocean-600", "bg-terra-400", "bg-olive-400"][i]
                }`}
              />
            ))}
          </div>
          <div>
            <div className="flex items-center gap-1 text-terra-500">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} size={12} fill="currentColor" />
              ))}
            </div>
            <p className="text-xs font-bold text-ink">Loved by 2M+ travelers</p>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        style={{ y: contentY }}
        className="relative z-20 mx-auto flex max-w-6xl flex-col items-center px-4 text-center"
      >
        {/* eyebrow */}
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7, ease: easeExpo }}
          className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-white/90 backdrop-blur"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-terra-400" />
          Explore 120+ countries
        </motion.span>

        {/* Headline — word by word */}
        <motion.h1
          variants={stagger(0.12, 0.4)}
          initial="hidden"
          animate="show"
          style={{ perspective: 800 }}
          className="max-w-4xl font-display text-[clamp(3rem,9vw,6.5rem)] font-semibold leading-[1.02] tracking-tight text-white drop-shadow-[0_2px_28px_rgba(17,47,66,0.5)]"
        >
          {HEADLINE.map((word, i) => (
            <span key={i} className="inline-block overflow-hidden pb-2">
              <motion.span
                variants={wordReveal}
                className={`inline-block ${i >= 2 ? "italic" : ""}`}
              >
                {word}
                {i < HEADLINE.length - 1 && " "}
              </motion.span>
            </span>
          ))}
        </motion.h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.9 }}
          className="mt-5 max-w-xl text-base font-medium text-white/85 sm:text-lg"
        >
          Find stays that fit your style, budget, and travel needs — all in one
          beautifully simple search.
        </motion.p>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 1.0, duration: 0.9, ease: easeExpo }}
          className="mt-10 w-full max-w-4xl"
        >
          <SearchBar />
        </motion.div>
      </motion.div>

      {/* Feature badges below the fold of the hero card */}
      <div className="relative z-10 mx-auto mt-20 max-w-4xl px-4">
        <FeatureBadges />
      </div>
    </section>
  );
}
