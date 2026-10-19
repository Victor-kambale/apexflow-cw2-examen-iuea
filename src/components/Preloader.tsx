import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { OWNER } from "@/lib/site";

// Full-screen loader: spinning gold ring with name + registration ID, fades out after mount.
export function Preloader() {
  const [show, setShow] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setShow(false), 1800);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
          exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
          transition={{ duration: 0.7 }}
        >
          <div className="relative flex h-72 w-72 items-center justify-center">
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-transparent border-t-gold border-r-emerald shadow-glow"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
            />
            <motion.div
              className="absolute inset-4 rounded-full border border-dashed border-gold/40"
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
            />
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="px-8 text-center"
            >
              <p className="font-display text-2xl font-bold text-gradient">{OWNER.name.toUpperCase()}</p>
              <p className="mt-2 font-mono text-xs text-accent">REG ID: {OWNER.regId}</p>
              <p className="mt-2 text-[10px] uppercase tracking-widest text-muted-foreground">{OWNER.course}</p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
