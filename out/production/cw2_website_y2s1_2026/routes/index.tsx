import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { PipelineDashboard } from "@/components/PipelineDashboard";
import { PIPELINES } from "@/lib/pipeline";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ApexFlow — Global Anti-Scam Metrics & Opportunity Pipeline" },
      { name: "description", content: "Interactive simulated dashboard for anti-scam metrics, opportunity records and integrity validation." },
      { property: "og:title", content: "ApexFlow Global Integrity Dashboard" },
      { property: "og:description", content: "Simulated opportunity feeds from six global pipelines with SHA-256 demo validation." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Home,
});

function Home() {
  const [ready, setReady] = useState(false);
  const reducedMotion = useReducedMotion();
  const entrance = (delay: number) => ({
    initial: reducedMotion ? false as const : { opacity: 0, y: 24, filter: "blur(5px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    transition: { delay: reducedMotion ? 0 : delay, duration: reducedMotion ? 0 : 0.75 },
  });
  useEffect(() => setReady(true), []);
  return (
    <>
      <section className="grid-bg border-b border-border px-5 pb-16 pt-32">
        <div className="mx-auto max-w-7xl">
          <motion.p {...entrance(1.55)} className="inline-flex items-center gap-2 font-mono text-xs text-accent"><ShieldCheck className="control-room-beacon h-4 w-4 shrink-0" />INTERACTIVE SIMULATION · CONTROL ROOM</motion.p>
          <motion.h1 {...entrance(1.8)} className="mt-5 max-w-5xl text-4xl font-bold leading-[1.08] sm:text-5xl md:text-7xl">
            Automating Global Integrity, <span className="text-gradient">One Live Feed at a Time.</span>
          </motion.h1>
          <motion.p {...entrance(2.05)} className="mt-6 max-w-2xl text-lg text-muted-foreground">Monitor simulated opportunity records, source tags and anti-scam validation from six pipelines across five countries.</motion.p>
          <motion.div {...entrance(2.3)} className="mt-8 flex flex-wrap items-center gap-5">
            <Button asChild className="bg-gradient-gold px-5 font-semibold"><a href="#pipeline">View pipeline matrix <ArrowRight className="h-4 w-4" /></a></Button>
            <Button asChild variant="link" className="px-0 text-muted-foreground"><Link to="/about">How validation works</Link></Button>
          </motion.div>
        </div>
      </section>
      <div id="pipeline">{ready ? <PipelineDashboard /> : <p className="py-24 text-center text-muted-foreground">Initializing integrity engine…</p>}</div>
      <section aria-label="Pipeline source ticker" className="overflow-hidden border-y border-border py-5">
        {[0, 1].map((row) => (
          <div key={row} className={`${row ? "marquee-rev" : "marquee"} flex w-max gap-4 py-2`}>
            {[...PIPELINES, ...PIPELINES, ...PIPELINES, ...PIPELINES].map((p, i) => (
              <span key={`${p.id}-${i}`} className="rounded-md border border-border bg-card px-4 py-2 font-mono text-xs"><span className="text-gold">{p.country}</span> · {p.title} · <span className="text-accent">DEMO VALIDATED</span></span>
            ))}
          </div>
        ))}
      </section>
    </>
  );
}
