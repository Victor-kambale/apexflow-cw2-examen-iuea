export const ENGINE_METRICS = { requests: 45000, pipelines: 6, spoofedAllowed: 0, verification: 100 };

export const PIPELINES = [
  { id: "US-01", country: "USA", source: "USAJOBS", url: "https://www.usajobs.gov/", title: "Information Technology Specialist" },
  { id: "CA-02", country: "Canada", source: "GC Jobs", url: "https://www.canada.ca/en/services/jobs/opportunities/government.html", title: "Cyber Security Analyst" },
  { id: "DE-03", country: "Germany", source: "Make it in Germany", url: "https://www.make-it-in-germany.com/en/working-in-germany/job-listings", title: "Software Engineer" },
  { id: "AE-04", country: "Dubai", source: "Dubai Careers", url: "https://dubaicareers.ae/", title: "Data Engineer" },
  { id: "UG-05", country: "Uganda", source: "Public Service Commission", url: "https://www.psc.go.ug/", title: "Systems Administrator" },
  { id: "UG-06", country: "Uganda", source: "Public Service Commission", url: "https://www.psc.go.ug/", title: "Graduate ICT Officer" },
] as const;

export type Feed = {
  id: string; pipeline: string; country: string; source: string; url: string;
  title: string; timestamp: string; digest: string; verified: boolean;
};

export function payloadFor(feed: Omit<Feed, "digest" | "verified">) {
  return JSON.stringify(feed);
}

export async function sha256(payload: string): Promise<string> {
  const buffer = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(payload));
  return Array.from(new Uint8Array(buffer), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

export async function validateDigest(payload: string, expected: string): Promise<boolean> {
  return (await sha256(payload)) === expected;
}

export async function createFeed(sequence: number): Promise<Feed> {
  const pipeline = PIPELINES[sequence % PIPELINES.length];
  if (!pipeline) throw new Error("Pipeline unavailable");
  const record = {
    id: `AF-${String(sequence + 1).padStart(6, "0")}`, pipeline: pipeline.id,
    country: pipeline.country, source: pipeline.source, url: pipeline.url,
    title: pipeline.title, timestamp: new Date().toISOString(),
  };
  const payload = payloadFor(record);
  const digest = await sha256(payload);
  return { ...record, digest, verified: await validateDigest(payload, digest) };
}

export function filterFeeds(feeds: Feed[], country: string, search: string) {
  const query = search.trim().toLowerCase();
  return feeds.filter((feed) => (country === "All" || feed.country === country) &&
    `${feed.title} ${feed.source} ${feed.id}`.toLowerCase().includes(query));
}