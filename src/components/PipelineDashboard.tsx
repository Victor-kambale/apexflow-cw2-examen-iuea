import { useEffect, useRef, useState } from "react";
import { Activity, ArrowUpRight, Check, Fingerprint, Pause, Play, RefreshCw, Search, ShieldCheck, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { createFeed, ENGINE_METRICS, filterFeeds, PIPELINES, sha256, validateDigest, type Feed } from "@/lib/pipeline";

export function PipelineDashboard() {
  const [feeds, setFeeds] = useState<Feed[]>([]);
  const [paused, setPaused] = useState(false);
  const [country, setCountry] = useState("All");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Feed | null>(null);
  const [error, setError] = useState("");
  const [audit, setAudit] = useState("");
  const [received, setReceived] = useState(0);
  const [busy, setBusy] = useState(false);
  const sequence = useRef(0);
  const visible = filterFeeds(feeds, country, search);

  useEffect(() => {
    if (paused) return;
    let cancelled = false;
    async function receive() {
      try {
        const batch = await Promise.all(Array.from({ length: 6 }, () => createFeed(sequence.current++)));
        if (cancelled) return;
        setFeeds((old) => [...batch.reverse(), ...old].slice(0, 36));
        setReceived((count) => count + batch.length);
        setError("");
      } catch {
        if (!cancelled) setError("Integrity engine unavailable. Refresh to retry.");
      }
    }
    void receive();
    const timer = window.setInterval(() => void receive(), 5000);
    return () => { cancelled = true; window.clearInterval(timer); };
  }, [paused]);

  async function refresh() {
    setBusy(true);
    try {
      const row = await createFeed(sequence.current++);
      setFeeds((old) => [row, ...old].slice(0, 36));
      setReceived((count) => count + 1);
      setError("");
    } catch { setError("Integrity engine unavailable. Refresh to retry."); }
    finally { setBusy(false); }
  }

  async function testInjection() {
    setAudit("Checking…");
    try {
      const digest = await sha256("original demo opportunity");
      const allowed = await validateDigest("spoofed demo opportunity", digest);
      setAudit(allowed ? "Unexpected match" : "Rejected · payload digest mismatch · 0 injections allowed");
    } catch { setAudit("Integrity check unavailable"); }
  }

  const metrics = [
    { value: `${(ENGINE_METRICS.requests + received).toLocaleString("en-US")}+`, label: "API Requests", detail: "Simulated processing count", icon: Activity },
    { value: "6", label: "Global Pipelines Active", detail: "5 countries · 6 source channels", icon: ArrowUpRight },
    { value: "0", label: "Spoofed Injections Allowed", detail: "Demo digest mismatch rejection", icon: ShieldCheck },
    { value: "100%", label: "Secure Cryptographic Verification", detail: "SHA-256 demo integrity · not authenticity", icon: Fingerprint },
  ];

  return (
    <>
      <section aria-label="Engine metrics" className="grid gap-px border-y border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map(({ value, label, detail, icon: Icon }) => <div key={label} className="bg-background px-6 py-7">
          <Icon className="mb-4 h-5 w-5 text-gold" /><p className="font-mono text-3xl font-bold text-foreground">{value}</p>
          <h2 className="mt-2 text-sm font-medium">{label}</h2><p className="mt-1 text-xs text-muted-foreground">{detail}</p>
        </div>)}
      </section>
      <section className="mx-auto max-w-7xl px-5 py-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div><p className="font-mono text-xs text-accent">NETWORK / OPPORTUNITY INTELLIGENCE</p><h2 className="mt-2 text-3xl font-bold">Global pipeline matrix</h2></div>
          <p className="flex items-center gap-2 font-mono text-xs text-muted-foreground"><span className={`h-2 w-2 rounded-full ${paused ? "bg-gold" : "bg-accent"}`} />{paused ? "PAUSED" : "SIMULATION ACTIVE"}</p>
        </div>
        <div className="mt-6 grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {PIPELINES.map((pipeline) => <div key={pipeline.id} className="rounded-lg border border-border bg-card p-4">
            <div className="flex justify-between gap-2 font-mono text-xs"><span className="text-gold">{pipeline.id}</span><Check className="h-3 w-3 text-accent" /></div>
            <h3 className="mt-3 font-semibold">{pipeline.country}</h3><p className="mt-1 min-h-8 text-xs text-muted-foreground">{pipeline.source}</p>
            <p className="mt-3 border-t border-border pt-3 font-mono text-[10px] text-accent">{paused ? "STANDBY" : "DEMO CHANNEL ONLINE"}</p>
          </div>)}
        </div>
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
          <h2 className="flex items-center gap-2 text-xl font-semibold"><Activity className="h-5 w-5 text-accent" />Opportunity feed <span className="font-mono text-xs text-muted-foreground">{visible.length} records</span></h2>
          <div className="flex gap-2"><Button variant="outline" onClick={() => setPaused((value) => !value)}>{paused ? <Play /> : <Pause />}{paused ? "Resume" : "Pause"}</Button><Button variant="outline" size="icon" title="Receive next demo record" aria-label="Refresh feed" disabled={busy} onClick={() => void refresh()}><RefreshCw className={busy ? "animate-spin" : ""} /></Button></div>
        </div>
        <p className="my-4 text-sm text-muted-foreground">Simulated opportunities and receipt timestamps — not government-issued vacancies or official publication times. Source links open public portals.</p>
        <div className="mb-5 flex flex-wrap gap-3">
          <div className="relative min-w-52 flex-1"><Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" /><input aria-label="Search opportunities" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search job title, source or ID" className="h-10 w-full rounded-md border border-input bg-surface pl-10 pr-4 text-sm outline-none focus:ring-1 focus:ring-ring" /></div>
          <select aria-label="Filter country" value={country} onChange={(event) => setCountry(event.target.value)} className="h-10 rounded-md border border-input bg-surface px-3 text-sm">
            {["All", "USA", "Canada", "Germany", "Dubai", "Uganda"].map((value) => <option key={value}>{value}</option>)}
          </select>
        </div>
        {error && <p role="alert" className="py-4 text-destructive">{error}</p>}
        <div className="max-h-[540px] overflow-auto border-y border-border">
          <table className="w-full min-w-[720px] text-left text-sm"><thead className="sticky top-0 z-10 bg-surface text-xs text-muted-foreground"><tr>{["Opportunity / source", "Country", "Received (UTC)", "Validation", "Record"].map((label) => <th key={label} className="px-4 py-3 font-normal">{label}</th>)}</tr></thead>
            <tbody>{visible.map((feed) => <tr key={feed.id} className="border-t border-border transition-colors hover:bg-surface">
              <td className="px-4 py-4"><p className="font-medium">{feed.title}</p><p className="mt-1 text-xs text-muted-foreground">{feed.source} · {feed.id}</p></td>
              <td className="px-4 py-4 font-mono text-xs text-gold">{feed.country}</td>
              <td className="px-4 py-4 font-mono text-xs text-muted-foreground">{feed.timestamp.slice(0, 10)}<br />{feed.timestamp.slice(11, 19)} UTC</td>
              <td className="px-4 py-4"><span className="inline-flex items-center gap-1 text-xs text-accent"><ShieldCheck className="h-4 w-4" />{feed.verified ? "Demo integrity passed" : "Rejected"}</span></td>
              <td className="px-4 py-4"><Button variant="ghost" size="icon" aria-label={`Inspect ${feed.id}`} onClick={() => setSelected(feed)}><ArrowUpRight /></Button></td>
            </tr>)}</tbody></table>
          {!visible.length && <p className="py-12 text-center text-muted-foreground">{feeds.length ? "No matching opportunities." : error ? "No records available." : "Awaiting demo records…"}</p>}
        </div>
        <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-b border-border pb-5"><p className="max-w-2xl text-xs text-muted-foreground">Integrity is not authenticity. Local SHA-256 checks detect changed demo payloads; no government signatures, APIs or security guarantees are connected.</p><Button variant="outline" onClick={() => void testInjection()}><X />Test spoofed injection</Button></div>
        {audit && <p role="status" className="mt-4 font-mono text-xs text-accent">{audit}</p>}
      </section>
      <Dialog open={selected !== null} onOpenChange={(open) => { if (!open) setSelected(null); }}>
        <DialogContent className="max-w-lg"><DialogTitle>{selected?.title}</DialogTitle><DialogDescription>Simulated record · not an advertised vacancy. Receipt time is generated locally.</DialogDescription>
          {selected && <div className="space-y-4 text-sm"><p>{selected.country} / {selected.source}</p><p className="font-mono text-xs">{selected.timestamp}</p><div><p className="mb-2 text-muted-foreground">SHA-256 payload digest</p><code className="block break-all rounded-md bg-muted p-3 text-xs text-accent">{selected.digest}</code></div><Button asChild variant="outline"><a href={selected.url} target="_blank" rel="noreferrer">Open public source portal <ArrowUpRight /></a></Button></div>}
        </DialogContent>
      </Dialog>
    </>
  );
}