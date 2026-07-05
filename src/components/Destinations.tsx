"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, MapPin } from "lucide-react";
import { fadeUp, scaleIn, stagger } from "@/lib/motion";

type Dest = {
  name: string;
  country: string;
  price: string;
  img: string;
  span: string;
};

const DESTS: Dest[] = [
  {
    name: "Santorini",
    country: "Greece",
    price: "$210",
    img: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?q=80&w=1200&auto=format&fit=crop",
    span: "sm:col-span-2 sm:row-span-2",
  },
  {
    name: "Kyoto",
    country: "Japan",
    price: "$180",
    img: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1200&auto=format&fit=crop",
    span: "",
  },
  {
    name: "Bali",
    country: "Indonesia",
    price: "$95",
    img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1200&auto=format&fit=crop",
    span: "",
  },
  {
    name: "Swiss Alps",
    country: "Switzerland",
    price: "$260",
    img: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?q=80&w=1200&auto=format&fit=crop",
    span: "sm:col-span-2",
  },
];

export default function Destinations() {
  return (
    <section className="relative bg-paper px-4 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <motion.div
          variants={stagger(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="mb-14 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end"
        >
          <div>
            <motion.span
              variants={fadeUp}
              className="mb-3 inline-flex items-center gap-2 rounded-full border border-ink/10 bg-ink/[0.04] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-ink/60"
            >
              <MapPin size={13} className="text-terra-500" />
              Trending now
            </motion.span>
            <motion.h2
              variants={fadeUp}
              className="max-w-xl font-display text-4xl font-semibold leading-tight tracking-tight text-ink sm:text-5xl"
            >
              Stays for every kind of{" "}
              <em className="italic text-terra-500">wanderer</em>
            </motion.h2>
          </div>
          <motion.button
            variants={fadeUp}
            whileHover={{ x: 4 }}
            className="group flex items-center gap-2 text-sm font-bold text-ink/70 transition-colors hover:text-ink"
          >
            Explore all destinations
            <span className="grid h-9 w-9 place-items-center rounded-full bg-ink/[0.06] text-ink transition-colors group-hover:bg-ocean-600 group-hover:text-white">
              <ArrowUpRight size={16} />
            </span>
          </motion.button>
        </motion.div>

        <motion.div
          variants={stagger(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid auto-rows-[220px] grid-cols-1 gap-4 sm:grid-cols-4"
        >
          {DESTS.map((d) => (
            <motion.article
              key={d.name}
              variants={scaleIn}
              whileHover={{ y: -6 }}
              className={`group relative overflow-hidden rounded-3xl ${d.span}`}
            >
              <Image
                src={d.img}
                alt={`${d.name}, ${d.country}`}
                fill
                sizes="(max-width: 640px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-white/70">
                    {d.country}
                  </p>
                  <p className="text-2xl font-extrabold text-white">{d.name}</p>
                </div>
                <span className="rounded-full bg-white/90 px-3 py-1.5 text-sm font-bold text-ink backdrop-blur">
                  {d.price}
                  <span className="text-ink/50">/night</span>
                </span>
              </div>
              <span className="absolute right-4 top-4 grid h-10 w-10 translate-y-2 place-items-center rounded-full bg-white/90 text-ink opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                <ArrowUpRight size={18} />
              </span>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
