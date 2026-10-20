import { describe, expect, it } from "vitest";
import { ENGINE_METRICS, PIPELINES, filterFeeds, sha256, validateDigest, type Feed } from "@/lib/pipeline";

describe("engine simulation rules", () => {
  it("starts with 45,000 API requests", () => expect(ENGINE_METRICS.requests).toBe(45000));
  it("has six active global pipelines", () => expect(PIPELINES).toHaveLength(6));
  it("allows zero spoofed injections", async () => {
    expect(ENGINE_METRICS.spoofedAllowed).toBe(0);
    const digest = await sha256("original record");
    expect(await validateDigest("tampered record", digest)).toBe(false);
  });
  it("validates unchanged demo payloads", async () => {
    expect(ENGINE_METRICS.verification).toBe(100);
    expect(await validateDigest("demo record", await sha256("demo record"))).toBe(true);
  });
  it("includes all requested source tags", () => {
    expect([...new Set(PIPELINES.map((p) => p.country))]).toEqual(["USA", "Canada", "Germany", "Dubai", "Uganda"]);
  });
  it("combines country and job search filters", () => {
    const rows = PIPELINES.map((p) => ({ ...p, id: p.id, pipeline: p.id, timestamp: "2026-10-20T09:38:00Z", digest: "", verified: true })) satisfies Feed[];
    expect(filterFeeds(rows, "Uganda", "graduate").map((row) => row.title)).toEqual(["Graduate ICT Officer"]);
    expect(filterFeeds(rows, "USA", "graduate")).toHaveLength(0);
  });
});