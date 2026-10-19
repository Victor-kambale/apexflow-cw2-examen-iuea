import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { Reveal } from "@/components/Reveal";
import { VIDEOS, OWNER } from "@/lib/site";
import hero from "@/assets/hero.jpg";
import g1 from "@/assets/g1.jpg";
import g2 from "@/assets/g2.jpg";
import g3 from "@/assets/g3.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ApexFlow — Victor Kambale Developer Metrics Portal" },
      { name: "description", content: "Animated developer portfolio and metrics portal by Victor Kambale, BSSE student at IUEA." },
      { property: "og:title", content: "ApexFlow — Victor Kambale" },
      { property: "og:description", content: "Elite developer metrics portal and project catalog." },
    ],
  }),
  component: Home,
});

const IMAGES = [hero, g1, g2, g3];

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    let v = 0;
    const id = setInterval(() => {
      v += Math.ceil(to / 60);
      if (v >= to) { v = to; clearInterval(id); }
      setN(v);
    }, 25);
    return () => clearInterval(id);
  }, [to]);
  return <>{n.toLocaleString()}{suffix}</>;
}

function LiveLoad() {
  const [load, setLoad] = useState(42);
  useEffect(() => {
    const id = setInterval(() => setLoad(30 + Math.round(Math.random() * 60)), 1200);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
      <motion.div className="h-full bg-gradient-gold" animate={{ width: `${load}%` }} transition={{ type: "spring" }} />
    </div>
  );
}

function Home() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 200]);
  const [slide, setSlide] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setSlide((s) => (s + 1) % IMAGES.length), 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      {/* HERO: parallax image + gradient title */}
      <section className="relative flex min-h-screen items-center overflow-hidden">
        <motion.img src={hero} alt="Developer workstation" width={1600} height={912} style={{ y }}
          className="kenburns absolute inset-0 h-full w-full object-cover opacity-40" />
        <div className="grid-bg absolute inset-0 opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background" />
        <div className="relative mx-auto max-w-7xl px-5 pt-24">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}
            className="mb-4 inline-block rounded-full border border-accent/40 px-4 py-1 font-mono text-xs text-accent">
            ● LIVE · {OWNER.regId}
          </motion.p>
          <h1 className="font-display text-5xl font-bold leading-tight md:text-8xl">
            {["Engineering", "the", "future,"].map((w, i) => (
              <motion.span key={w} className="mr-4 inline-block"
                initial={{ opacity: 0, y: 80, rotateX: 90 }} animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ delay: 2 + i * 0.15, duration: 0.8 }}>{w}</motion.span>
            ))}
            <br />
            <motion.span className="text-gradient inline-block" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 2.6, duration: 0.8 }}>
              one commit at a time.
            </motion.span>
          </h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3 }} className="mt-6 max-w-xl text-lg text-muted-foreground">
            ApexFlow is the developer metrics portal and project catalog of {OWNER.name}, Software Engineering student at IUEA.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 3.2 }} className="mt-8 flex flex-wrap gap-4">
            <Link to="/gallery" className="rounded-full bg-gradient-gold px-7 py-3 font-semibold text-primary-foreground shadow-glow transition hover:scale-105">Explore Projects</Link>
            <Link to="/contact" className="rounded-full border border-gold/40 px-7 py-3 font-semibold transition hover:bg-gold/10">Hire Me</Link>
          </motion.div>
        </div>
      </section>

      {/* METRICS */}
      <section className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-5 py-20 md:grid-cols-4">
        {[
          { v: 1240, s: "+", l: "Commits" }, { v: 36, s: "", l: "Projects" },
          { v: 98, s: "%", l: "Lighthouse" }, { v: 5000, s: "h", l: "Coding" },
        ].map((m, i) => (
          <Reveal key={m.l} effect="zoom" delay={i * 0.1}>
            <div className="rounded-2xl border border-border bg-card p-6 transition hover:-translate-y-2 hover:border-gold/50 hover:shadow-glow">
              <p className="font-display text-4xl font-bold text-gradient"><Counter to={m.v} suffix={m.s} /></p>
              <p className="mt-1 text-sm text-muted-foreground">{m.l}</p>
            </div>
          </Reveal>
        ))}
        <Reveal className="col-span-2 md:col-span-4" effect="wipe">
          <div className="rounded-2xl border border-border bg-card p-6">
            <p className="mb-3 font-mono text-xs text-accent">SYSTEM LOAD · real-time</p>
            <LiveLoad />
          </div>
        </Reveal>
      </section>

      {/* AUTOPLAY CIRCLE VIDEOS */}
      <section className="mx-auto max-w-7xl px-5 py-10">
        <Reveal effect="flip"><h2 className="mb-10 text-center font-display text-4xl font-bold md:text-5xl">Live <span className="text-gradient">Streams</span></h2></Reveal>
        <div className="flex flex-wrap justify-center gap-6">
          {VIDEOS.map((v, i) => (
            <Reveal key={v} effect="swivel" delay={i * 0.15}>
              <motion.div whileHover={{ scale: 1.1 }} className="relative h-36 w-36 overflow-hidden rounded-full border-2 border-gold p-1 shadow-glow md:h-44 md:w-44">
                <motion.div className="absolute inset-0 rounded-full border-2 border-dashed border-accent" animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 10, ease: "linear" }} />
                <video src={v} autoPlay muted loop playsInline className="h-full w-full rounded-full object-cover" />
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* VIDEO BENTO GRID */}
      <section className="mx-auto grid max-w-7xl auto-rows-[220px] gap-4 px-5 py-16 md:grid-cols-4">
        {VIDEOS.map((v, i) => (
          <Reveal key={v} effect={i % 2 ? "zoom" : "fly"} delay={i * 0.1}
            className={i === 0 ? "md:col-span-2 md:row-span-2" : i === 3 ? "md:col-span-2" : ""}>
            <div className="group relative h-full overflow-hidden rounded-2xl border border-border">
              <video src={v} autoPlay muted loop playsInline className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
              <p className="absolute bottom-4 left-4 font-mono text-xs text-gold">STREAM_0{i + 1}</p>
            </div>
          </Reveal>
        ))}
      </section>

      {/* AUTOPLAY IMAGE CAROUSEL (crossfade slides) */}
      <section className="mx-auto max-w-7xl px-5 py-10">
        <div className="relative h-[420px] overflow-hidden rounded-3xl border border-gold/20">
          {IMAGES.map((img, i) => (
            <motion.img key={i} src={img} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover"
              animate={{ opacity: slide === i ? 1 : 0, scale: slide === i ? 1.05 : 1.2 }} transition={{ duration: 1.2 }} />
          ))}
          <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
            {IMAGES.map((_, i) => (
              <button key={i} aria-label={`Slide ${i + 1}`} onClick={() => setSlide(i)}
                className={`h-2 rounded-full transition-all ${slide === i ? "w-8 bg-gold" : "w-2 bg-foreground/40"}`} />
            ))}
          </div>
        </div>
      </section>

      {/* INFINITE IMAGE MARQUEE */}
      <section className="overflow-hidden py-16">
        {[0, 1].map((row) => (
          <div key={row} className={`${row ? "marquee-rev" : "marquee"} mb-4 flex w-max gap-4`}>
            {[...IMAGES, ...IMAGES, ...IMAGES, ...IMAGES].map((img, i) => (
              <img key={i} src={img} alt="" loading="lazy" className="h-40 w-64 rounded-xl object-cover transition hover:scale-105" />
            ))}
          </div>
        ))}
      </section>
    </>
  );
}
