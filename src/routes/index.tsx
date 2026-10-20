import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { PipelineDashboard } from "@/components/PipelineDashboard";
import { PIPELINES } from "@/lib/pipeline";

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
  useEffect(() => setReady(true), []);
  return (
    <>
      <section className="grid-bg border-b border-border px-5 pb-16 pt-32">
        <div className="mx-auto max-w-7xl">
          <p className="inline-flex items-center gap-2 font-mono text-xs text-accent"><ShieldCheck className="h-4 w-4" />INTERACTIVE SIMULATION · CONTROL ROOM</p>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.8, duration: 0.6 }} className="mt-5 max-w-5xl text-5xl font-bold leading-[1.02] md:text-7xl">
            Automating Global Integrity, <span className="text-gradient">One Live Feed at a Time.</span>
          </motion.h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">Monitor simulated opportunity records, source tags and anti-scam validation from six pipelines across five countries.</p>
          <a href="#pipeline" className="mt-8 inline-flex items-center gap-2 rounded-md bg-gradient-gold px-5 py-3 font-semibold text-primary-foreground">View pipeline matrix <ArrowRight className="h-4 w-4" /></a>
          <Link to="/about" className="ml-5 text-sm text-muted-foreground underline-offset-4 hover:text-gold hover:underline">How validation works</Link>
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
