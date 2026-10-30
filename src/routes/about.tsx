import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll } from "framer-motion";
import { useRef } from "react";
import { Reveal } from "@/components/Reveal";
import g2 from "@/assets/g2.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Integrity Method — ApexFlow" },
      { name: "description", content: "How ApexFlow demonstrates payload integrity checks and the limits of simulated anti-scam validation." },
      { property: "og:title", content: "Integrity Method — ApexFlow" },
      { property: "og:description", content: "How ApexFlow demonstrates payload integrity checks and the limits of simulated anti-scam validation." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: About,
});

const TIMELINE = [
  { year: "2024", title: "Victor Joined IUEA", text: "Enrolled in Bachelor of Science in Software Engineering." },
  { year: "2025", title: "First Full Website", text: "Shipped HTML/CSS/JS sites and learned responsive design." },
  { year: "2026", title: "Real World Java, React & TypeScript", text: "Elite Moved to component-driven, type-safe engineering." },
  { year: "2026", title: "YouTube Channel", text: "Started teaching developers through real-world builds." },
  { year: "2026", title: "Web Company: victorkambale.com(with only 2 years of experiences)",
      text: "Build the Impressive Real Web App project to prove that the Small Thing Do It Daily, Create A Massive Result[I Work Smart Not Hard. And I'm Consistency]" },
  { year: "2026", title: "ApexFlow", text: "Coursework 2: a production-grade animated portal." },
];

function About() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start center", "end center"] });

  return (
    <div className="mx-auto max-w-6xl px-5 pb-20 pt-32">
      <div className="grid items-center gap-10 md:grid-cols-2">
        <Reveal effect="wipe">
          <img src={g2} alt="Victor coding at night" width={1024} height={1024} className="rounded-3xl border border-gold/30 shadow-glow" />
        </Reveal>
        <Reveal effect="fly" delay={0.2}>
          <h1 className="font-display text-5xl font-bold">Integrity is <span className="text-gradient">not authenticity.</span></h1>
          <p className="mt-6 text-muted-foreground">ApexFlow hashes each simulated record with SHA-256 and rechecks that digest. A mismatch proves the demo payload changed, but it does not prove an employer or government published it.</p>
        </Reveal>
      </div>

      <div className="mt-16 grid gap-4 md:grid-cols-3">
        {["Clean code is kind code.", "Performance is a feature.", "Ship, learn, repeat."].map((q, i) => (
          <Reveal key={q} effect="flip" delay={i * 0.15}>
            <div className="rounded-2xl border border-border bg-card p-6 font-display text-xl transition hover:border-accent">“{q}”</div>
          </Reveal>
        ))}
      </div>

      <h2 className="mt-24 text-center font-display text-4xl font-bold">The <span className="text-gradient">Journey</span></h2>
      <div ref={ref} className="relative mx-auto mt-12 max-w-3xl">
        <div className="absolute left-4 top-0 h-full w-0.5 bg-border md:left-1/2" />
        <motion.div style={{ scaleY: scrollYProgress }} className="absolute left-4 top-0 h-full w-0.5 origin-top bg-gradient-gold md:left-1/2" />
        {TIMELINE.map((t, i) => (
          <Reveal key={t.year} effect={i % 2 ? "swivel" : "fly"}
            className={`relative mb-12 pl-12 md:w-1/2 ${i % 2 ? "md:ml-auto md:pl-12" : "md:pl-0 md:pr-12 md:text-right"}`}>
            <span className={`absolute top-2 h-4 w-4 rounded-full bg-gold shadow-glow left-2 ${i % 2 ? "md:-left-2" : "md:left-auto md:-right-2"}`} />
            <p className="font-mono text-sm text-accent">{t.year}</p>
            <h3 className="font-display text-2xl font-bold">{t.title}</h3>
            <p className="text-muted-foreground">{t.text}</p>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
