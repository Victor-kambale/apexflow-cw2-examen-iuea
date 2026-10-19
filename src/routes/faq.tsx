import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useState } from "react";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — How ApexFlow Was Built" },
      { name: "description", content: "Answers about the tech stack, animations and responsiveness behind ApexFlow." },
      { property: "og:title", content: "ApexFlow FAQ" },
      { property: "og:description", content: "How this animated portal was engineered." },
    ],
  }),
  component: FAQ,
});

const QA = [
  ["What stack powers ApexFlow?", "React 19, TypeScript, TanStack Start for routing, Tailwind CSS v4 for styling and Framer Motion for animation."],
  ["Why clsx + tailwind-merge?", "The cn() helper in src/lib/utils.ts joins conditional classes (clsx) and removes conflicting Tailwind classes (tailwind-merge)."],
  ["How are the PowerPoint-style effects made?", "A reusable Reveal component offers Fly, Zoom, Flip, Wipe and Swivel entrances, triggered when content scrolls into view."],
  ["Is it responsive?", "Yes — every grid collapses from 4 → 2 → 1 columns, and the mobile menu slides in from the left."],
  ["How do autoplay videos work?", "HTML5 video with autoPlay, muted, loop and playsInline — required by browsers to autoplay on phones."],
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="mx-auto max-w-3xl px-5 pb-20 pt-32">
      <h1 className="text-center font-display text-5xl font-bold">Questions, <span className="text-gradient">answered.</span></h1>
      <div className="mt-12 space-y-3">
        {QA.map(([q, a], i) => (
          <Reveal key={q} effect="fly" delay={i * 0.08}>
            <div className={`rounded-2xl border bg-card transition ${open === i ? "border-gold/50 shadow-glow" : "border-border"}`}>
              <button onClick={() => setOpen(open === i ? null : i)} className="flex w-full items-center justify-between p-5 text-left font-display text-lg">
                {q}
                <motion.span animate={{ rotate: open === i ? 45 : 0 }} className="text-gold"><Plus /></motion.span>
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                    <p className="px-5 pb-5 text-muted-foreground">{a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
