import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { filterGallery, GALLERY_CATEGORIES, type GalleryCategory } from "@/lib/gallery";

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

const PER_PAGE = 6;

function Gallery() {
  const [cat, setCat] = useState<GalleryCategory>("All");
  const [page, setPage] = useState(0);
  const reducedMotion = useReducedMotion();
  const list = filterGallery(cat);
  const pages = Math.max(1, Math.ceil(list.length / PER_PAGE));
  const shown = list.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE);

  return (
    <div className="mx-auto max-w-7xl px-5 pb-20 pt-32">
      <p className="text-center font-mono text-xs text-accent">APEXFLOW / NETWORK VISUALS</p>
      <h1 className="mt-4 text-center font-display text-4xl font-bold sm:text-5xl">Engineering <span className="text-gradient">Gallery</span></h1>
      <div aria-label="Gallery categories" className="mt-8 flex flex-wrap justify-center gap-2">
        {GALLERY_CATEGORIES.map((c) => (
          <Button key={c} variant={cat === c ? "default" : "ghost"} aria-pressed={cat === c} onClick={() => { setCat(c); setPage(0); }}
            className={cn("relative px-4", cat !== c && "text-muted-foreground")}>
            {c}
          </Button>
        ))}
      </div>

      <motion.div layout className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {shown.map((it, i) => (
            <motion.figure key={it.id} layout
              initial={reducedMotion ? false : { opacity: 0, y: 36, rotateX: 8 }} animate={{ opacity: 1, y: 0, rotateX: 0 }}
              exit={{ opacity: 0 }} transition={{ duration: reducedMotion ? 0 : 0.5, delay: reducedMotion ? 0 : i * 0.07 }}
              className="group overflow-hidden rounded-md border border-border bg-card">
              <div className="aspect-[4/3] overflow-hidden">
              <img src={it.src} alt={it.alt} loading="lazy" width={1200} height={912} className="h-full
              w-full object-cover transition duration-700 motion-safe:group-hover:scale-105" /></div>
              <figcaption className="flex items-center justify-between gap-3 px-4 py-4">
                <span className="font-display text-base font-semibold">{it.title}</span>
                <span className="font-mono text-xs text-accent">{it.cat}</span>
              </figcaption>
            </motion.figure>
          ))}
        </AnimatePresence>
      </motion.div>

      <div className="mt-10 flex items-center justify-center gap-4">
        <Button variant="outline" size="icon" title="Previous page" aria-label="Previous page" disabled={page === 0} onClick={() => setPage((value) => value - 1)}><ArrowLeft /></Button>
        <span aria-live="polite" className="min-w-16 text-center font-mono text-sm text-muted-foreground">{page + 1} / {pages}</span>
        <Button variant="outline" size="icon" title="Next page" aria-label="Next page" disabled={page + 1 >= pages} onClick={() => setPage((value) => value + 1)}><ArrowRight /></Button>
      </div>
    </div>
  );
}
