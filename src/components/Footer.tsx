import { Link } from "@tanstack/react-router";
import { OWNER, SOCIALS } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="overflow-hidden border-b border-border py-4">
        <div className="marquee flex w-max gap-12 font-display text-2xl text-muted-foreground/40">
          {Array.from({ length: 2 }).flatMap((_, k) => ["GLOBAL INTEGRITY", "USA",
              "CANADA", "GERMANY", "DUBAI", "UGANDA", "SHA-256"].map((w) => (
              <span key={k + w}>{w} ✦</span>
            )),
          )}
        </div>
      </div>
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-12 md:grid-cols-3">
        <div>
          <p className="font-display text-xl font-bold text-gradient">ApexFlow</p>
          <p className="mt-2 text-sm text-muted-foreground">Global Anti-Scam Metrics &amp;
          Opportunity Pipeline Network</p>
          <p className="mt-2 text-sm text-muted-foreground">{OWNER.name} · {OWNER.regId}</p>
          <p className="text-sm text-muted-foreground">{OWNER.school}</p>
        </div>
        <div className="flex flex-col gap-2 text-sm">
          {(["/", "/about", "/gallery", "/faq", "/contact"] as const).map((p) => (
            <Link key={p} to={p} className="text-muted-foreground hover:text-gold">
              {p === "/" ? "Dashboard" : p === "/about" ? "Integrity" :
                  p === "/gallery" ? "Network" : p.slice(1).toUpperCase()}
            </Link>
          ))}
        </div>
        <div className="flex flex-wrap content-start gap-2">
          {SOCIALS.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noreferrer"
              className="rounded-full border border-gold/30 px-4 py-2 text-sm
              transition hover:bg-gold hover:text-primary-foreground">
              {s.label}
            </a>
          ))}
        </div>
      </div>
      <p className="px-5 pb-6 text-center text-xs text-muted-foreground">
        © 2026 Victor Kambale. Responsive Web Design · Coursework 2 · Examen Y2S1
      </p>
    </footer>
  );
}
