import workspace1 from "@/assets/ws1.jpg";
import workspace2 from "@/assets/ws2.jpg";
import hardware1 from "@/assets/hw1.jpg";
import hardware2 from "@/assets/hw2.jpg";
import dashboard1 from "@/assets/db1.jpg";
import dashboard2 from "@/assets/db2.jpg";
import people1 from "@/assets/people1.jpg";
import people2 from "@/assets/people2.jpg";

export const GALLERY_CATEGORIES = ["All", "Workspace", "Hardware", "Dashboards", "People"] as const;
export type GalleryCategory = (typeof GALLERY_CATEGORIES)[number];

// One source per item: never repeat a photo to fill the grid.
export const GALLERY_ITEMS = [
  { id: "ws-1", src: workspace1, cat: "Workspace", title: "Development station", alt: "Dual-monitor coding workspace with emerald desk lighting" },
  { id: "ws-2", src: workspace2, cat: "Workspace", title: "Focused essentials", alt: "Overhead view of a laptop, keyboard, notebook and desk lamp" },
  { id: "hw-1", src: hardware1, cat: "Hardware", title: "Network backbone", alt: "Server patch panel with connected network cables" },
  { id: "hw-2", src: hardware2, cat: "Hardware", title: "Inside the processor", alt: "Close-up of a processor and circuit board traces" },
  { id: "db-1", src: dashboard1, cat: "Dashboards", title: "Global telemetry", alt: "Desktop analytics display with a world map and charts" },
  { id: "db-2", src: dashboard2, cat: "Dashboards", title: "Operations floor", alt: "Bright operations room with a wall of network analytics displays" },
  { id: "pe-1", src: people1, cat: "People", title: "Engineering together", alt: "Two students collaborating on a laptop and electronics project" },
  { id: "pe-2", src: people2, cat: "People", title: "Infrastructure in practice", alt: "Network engineer inspecting a patch panel with a tablet" },
] as const;

export function filterGallery(category: GalleryCategory) {
  return GALLERY_ITEMS.filter((item) => category === "All" || item.cat === category);
}