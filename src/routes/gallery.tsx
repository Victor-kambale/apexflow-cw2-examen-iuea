import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";
import hero from "@/assets/hero.jpg";
import g1 from "@/assets/g1.jpg";
import g2 from "@/assets/g2.jpg";
import g3 from "@/assets/g3.jpg";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Network Visuals — ApexFlow" },
      { name: "description", content: "Visual catalog for the ApexFlow simulated global opportunity network." },
      { property: "og:title", content: "Network Visuals — ApexFlow" },
      { property: "og:description", content: "Visual catalog for the ApexFlow simulated global opportunity network." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Gallery,
});

const CATS = ["All", "Workspace", "Hardware", "Dashboards", "People"] as const;
const ITEMS = Array.from({ length: 12 }, (_, i) => {
  const set = [
    { src: hero, cat: "Workspace" }, { src: g1, cat: "Hardware" },
    { src: g3, cat: "Dashboards" }, { src: g2, cat: "People" },
  ][i % 4]!;
  return { ...set, id: i, title: `${set.cat} #${i + 1}` };
});
const PER_PAGE = 6;

function Gallery() {
  const [cat, setCat] = useState<(typeof CATS)[number]>("All");
  const [page, setPage] = useState(0);
  const list = ITEMS.filter((i) => cat === "All" || i.cat === cat);
  const pages = Math.max(1, Math.ceil(list.length / PER_PAGE));
  const shown = list.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE);

  return (
    <div className="mx-auto max-w-7xl px-5 pb-20 pt-32">
      <h1 className="text-center font-display text-5xl font-bold">Engineering <span className="text-gradient">Gallery</span></h1>
      <div className="mt-8 flex flex-wrap justify-center gap-2">
        {CATS.map((c) => (
          <button key={c} onClick={() => { setCat(c); setPage(0); }}
            className={cn("relative rounded-full px-5 py-2 text-sm transition", cat === c ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground")}>
            {cat === c && <motion.span layoutId="pill" className="absolute inset-0 rounded-full bg-gradient-gold" />}
            <span className="relative">{c}</span>
          </button>
        ))}
      </div>

      <motion.div layout className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {shown.map((it, i) => (
            <motion.figure key={it.id} layout
              initial={{ opacity: 0, scale: 0.8, rotateY: 45 }} animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              exit={{ opacity: 0, scale: 0.8 }} transition={{ delay: i * 0.05 }}
              className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-border">
              <img src={it.src} alt={it.title} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-125 group-hover:rotate-2" />
              <figcaption className="absolute inset-0 flex items-end bg-gradient-to-t from-background/90 to-transparent p-4 opacity-0 transition group-hover:opacity-100">
                <span className="translate-y-4 font-display text-lg transition group-hover:translate-y-0">{it.title}</span>
              </figcaption>
            </motion.figure>
          ))}
        </AnimatePresence>
      </motion.div>

      <div className="mt-10 flex justify-center gap-2">
        {Array.from({ length: pages }).map((_, i) => (
          <button key={i} onClick={() => setPage(i)} aria-label={`Page ${i + 1}`}
            className={cn("h-10 w-10 rounded-full border font-mono text-sm transition", page === i ? "border-gold bg-gold text-primary-foreground" : "border-border hover:border-gold")}>
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
