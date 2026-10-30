import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { SOCIALS } from "@/lib/site";
import { Button } from "@/components/ui/button";

const NAV = [
  { to: "/", label: "Dashboard" },
  { to: "/about", label: "Integrity" },
  { to: "/gallery", label: "Network" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
] as const;

// Sticky translucent header. Background turns solid-glass after scrolling as well.
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [drop, setDrop] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled ? "glass border-b border-gold/20 py-2 shadow-glow" : "py-4",
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5">
        <Link to="/" className="font-mono text-lg font-bold">
          <span className="text-gold">&lt;</span>ApexEngine<span className="text-accent">/</span>
          <span className="text-gold">&gt;</span>
          <span className="ml-2 hidden font-display text-sm text-muted-foreground lg:inline">
          ApexFlow</span>
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {NAV.map((n) => (
            <li key={n.to}>
              <Link
                to={n.to}
                activeOptions={{ exact: true }}
                className="rounded-full px-4 py-2 text-sm text-muted-foreground transition
                hover:text-foreground"
                activeProps={{ className: "bg-gold/10 !text-gold" }}
              >
                {n.label}
              </Link>
            </li>
          ))}
          <li className="relative" onMouseEnter={() => setDrop(true)}
          onMouseLeave={() => setDrop(false)}>
            <Button variant="ghost" aria-expanded={drop} onClick={() => setDrop((value) => !value)} onKeyDown={(event) => { if (event.key === "Escape") setDrop(false); }}
                className="flex items-center gap-1 rounded-full px-4 py-2 text-sm
                text-muted-foreground hover:text-foreground">
              Connect <ChevronDown className={cn("h-4 w-4 transition", drop && "rotate-180")} />
            </Button>
            <AnimatePresence>
              {drop && (
                <motion.ul
                  initial={{ opacity: 0, y: 10, rotateX: -20 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="glass absolute right-0 top-full w-56 rounded-xl border
                  border-gold/20 p-2 shadow-glow"
                >
                  {SOCIALS.map((s) => (
                    <li key={s.label}>
                      <a href={s.href} target="_blank" rel="noreferrer"
                        className="flex items-center gap-3 rounded-lg px-3 py-2
                         text-sm hover:bg-gold/10">
                        <span className="flex h-7 w-7 items-center justify-center
                            rounded-md bg-gradient-gold
                            font-mono text-[10px] font-bold text-primary-foreground">
                            {s.short}
                        </span>
                        {s.label}
                      </a>
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </li>
        </ul>

        <a href={SOCIALS.find((social) => social.label === "YouTube")?.href} target="_blank" rel="noreferrer"
          className="hidden rounded-full bg-gradient-gold px-5 py-2 text-sm font-semibold
          text-primary-foreground transition hover:scale-105 md:inline-block">
          Subscribe
        </a>

        <Button variant="ghost" size="icon" aria-label="Open menu" onClick={() => setOpen(true)} className="md:hidden">
          <Menu />
        </Button>
      </nav>

      {/* Mobile slide-and-flip menu from the left */}
      <AnimatePresence>
        {open && (
          <motion.div className="fixed inset-0 z-50 bg-background/80 md:hidden"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={() => setOpen(false)}>
            <motion.aside
              onClick={(e) => e.stopPropagation()}
              initial={{ x: "-100%", rotateY: 30 }}
              animate={{ x: 0, rotateY: 0 }}
              exit={{ x: "-100%", rotateY: 30 }}
              transition={{ type: "spring", damping: 22 }}
              className="h-full w-4/5 max-w-xs border-r border-gold/20 bg-surface p-6"
            >
              <Button variant="ghost" size="icon" aria-label="Close menu"
              onClick={() => setOpen(false)} className="mb-8"><X /></Button>
              {NAV.map((n, i) => (
                <motion.div key={n.to} initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * i }}>
                  <Link to={n.to} onClick={() => setOpen(false)}
                  className="block py-3 font-display text-2xl"
                  activeProps={{ className: "text-gold" }} activeOptions={{ exact: true }}>
                    {n.label}
                  </Link>
                </motion.div>
              ))}
              <div className="mt-8 flex flex-wrap gap-2">
                {SOCIALS.map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noreferrer"
                  className="rounded-full border border-gold/30 px-3 py-1 text-xs">{s.label}</a>
                ))}
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
