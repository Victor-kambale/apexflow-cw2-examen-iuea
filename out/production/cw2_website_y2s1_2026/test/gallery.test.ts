import { describe, expect, it } from "vitest";
import { filterGallery, GALLERY_ITEMS } from "@/lib/gallery";

describe("unique gallery collection", () => {
  it("contains eight distinct photo sources, never duplicated", () => {
    expect(GALLERY_ITEMS).toHaveLength(8);
    expect(new Set(GALLERY_ITEMS.map((item) => item.src)).size).toBe(8);
  });

  it.each(["Workspace", "Hardware", "Dashboards", "People"] as const)("contains two %s photos", (category) => {
    const items = filterGallery(category);
    expect(items).toHaveLength(2);
    expect(items.every((item) => item.cat === category)).toBe(true);
  });
});