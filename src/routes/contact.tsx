import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useRef, useState, type FormEvent } from "react";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { SOCIALS } from "@/lib/site";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — ApexFlow Integrity Network" },
      { name: "description", content: "Contact Victor Kambale about the ApexFlow anti-scam metrics coursework dashboard." },
      { property: "og:title", content: "Contact — ApexFlow Integrity Network" },
      { property: "og:description", content: "Contact Victor Kambale about the ApexFlow anti-scam metrics coursework dashboard." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Contact,
});

// Validation rules: trimmed, length-limited, valid email.
export const contactSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(80),
  email: z.string().trim().email("Enter a valid email").max(255),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(1000),
});
type Field = keyof z.infer<typeof contactSchema>;

function Contact() {
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [sent, setSent] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const res = contactSchema.safeParse(data);
    if (!res.success) {
      const errs: Partial<Record<Field, string>> = {};
      res.error.issues.forEach((i) => { errs[i.path[0] as Field] = i.message; });
      setErrors(errs);
      // Error scroll tracker: jump to the first invalid field.
      const first = Object.keys(errs)[0];
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    setErrors({});
    setSent(true);
    e.currentTarget.reset();
  };

  const input = (f: Field) => cn("w-full rounded-xl border bg-input/30 px-4 py-3 outline-none transition focus:border-gold focus:shadow-glow", errors[f] ? "border-destructive" : "border-border");

  return (
    <div className="mx-auto grid max-w-6xl gap-10 px-5 pb-20 pt-32 md:grid-cols-2">
      <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }}>
        <h1 className="font-display text-5xl font-bold">Let's build <span className="text-gradient">together.</span></h1>
        <p className="mt-4 text-muted-foreground">Projects, collaborations or a YouTube feature — my inbox is open.</p>
        <div className="mt-8 grid grid-cols-2 gap-3">
          {SOCIALS.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="rounded-xl border border-border bg-card p-4 transition hover:-translate-y-1 hover:border-gold">
              <span className="font-mono text-xs text-gold">{s.short}</span>
              <p className="font-display">{s.label}</p>
            </a>
          ))}
        </div>
      </motion.div>

      <motion.form ref={formRef} onSubmit={onSubmit} noValidate initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }}
        className="space-y-4 rounded-3xl border border-gold/20 bg-card p-6 md:p-8">
        {(["name", "email", "message"] as Field[]).map((f) => (
          <div key={f}>
            <label htmlFor={f} className="mb-1 block text-sm capitalize text-muted-foreground">{f}</label>
            {f === "message"
              ? <textarea id={f} name={f} rows={5} maxLength={1000} className={input(f)} />
              : <input id={f} name={f} type={f === "email" ? "email" : "text"} maxLength={f === "email" ? 255 : 80} className={input(f)} />}
            {errors[f] && <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="mt-1 text-sm text-destructive">{errors[f]}</motion.p>}
          </div>
        ))}
        <Button type="submit" className="w-full rounded-full bg-gradient-gold py-3 font-semibold text-primary-foreground transition hover:scale-[1.02]">Validate message</Button>
        {sent && <motion.p initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center text-accent">✓ Message validated locally. Not sent.</motion.p>}
      </motion.form>
    </div>
  );
}
