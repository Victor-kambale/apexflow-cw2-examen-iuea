import { motion } from "framer-motion";
import type { ReactNode } from "react";

// I have use here the PowerPoint-style entrance effects triggered on scroll.
const EFFECTS = {
  fly: { initial: { opacity: 0, y: 60 }, animate: { opacity: 1, y: 0 } },
  zoom: { initial: { opacity: 0, scale: 0.7 }, animate: { opacity: 1, scale: 1 } },
  flip: { initial: { opacity: 0, rotateX: 90 }, animate: { opacity: 1, rotateX: 0 } },
  wipe: { initial: { opacity: 0, clipPath: "inset(0 100% 0 0)" }, animate: { opacity: 1,
      clipPath: "inset(0 0% 0 0)" } },
  swivel: { initial: { opacity: 0, rotateY: 90 }, animate: { opacity: 1, rotateY: 0 } },
} as const;

export function Reveal({ children, effect = "fly", delay = 0, className }: {
  children: ReactNode; effect?: keyof typeof EFFECTS; delay?: number; className?: string;
}) {
  const e = EFFECTS[effect];
  return (
    <motion.div
      className={className}
      style={{ perspective: 1000 }}
      initial={e.initial}
      whileInView={e.animate}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
