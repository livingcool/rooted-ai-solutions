// src/data/updates.ts
// ─────────────────────────────────────────────────────────────────────────────
// Company updates feed — add videos, fliers, news links here.
// Type: 'video' | 'news' | 'flier' | 'link'
// ─────────────────────────────────────────────────────────────────────────────

export type UpdateType = "video" | "news" | "flier" | "link";

export interface CompanyUpdate {
  id:          string;
  type:        UpdateType;
  title:       string;
  description?: string;
  href:        string;
  videoUrl?:   string;   // YouTube / Vimeo embed URL
  imageUrl?:   string;   // Thumbnail for fliers/news
  date:        string;   // e.g. "Apr 2025"
  tag?:        string;   // e.g. "LIVE DEMO" | "NEW" | "CASE STUDY"
}

export const updates: CompanyUpdate[] = [
  {
    id:          "demo-video-01",
    type:        "video",
    title:       "Rooted AI — Platform Walkthrough",
    description: "See how our LLM agents automate manufacturing workflows end-to-end.",
    href:        "#",
    // Replace with real embed URL: e.g. "https://www.youtube.com/embed/YOUR_VIDEO_ID"
    videoUrl:    "",
    date:        "Apr 2026",
    tag:         "DEMO",
  },
  {
    id:          "news-01",
    type:        "news",
    title:       "We're accepting pilot projects for Q3 2026 — 3 spots remaining",
    href:        "/#contact",
    date:        "Apr 2026",
    tag:         "NEW",
  },
  {
    id:          "link-01",
    type:        "link",
    title:       "Manufacturing Automation ROI Report 2026",
    description: "How AI agents cut operational risk by 40% in logistics.",
    href:        "/blog",
    date:        "Mar 2026",
    tag:         "REPORT",
  },
  {
    id:          "flier-01",
    type:        "flier",
    title:       "Hosur Industrial Summit — RootedAI Presenting",
    href:        "#",
    date:        "May 2026",
    tag:         "EVENT",
  },
];
