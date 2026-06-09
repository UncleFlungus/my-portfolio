export type ProjectKind = "app" | "design";

export interface Project {
  index: string;
  title: string;
  kind: ProjectKind; // "app" gets a browser frame; "design" gets a plain frame
  category: string; // short mono tag
  mantra: string; // the one-liner / why
  description: string;
  media: { type: "video" | "image"; src: string; poster?: string };
  stack: string[];
  links: { live?: string; source?: string };
  demos?: { src: string; title: string; poster?: string }[];
}

// Drop real assets in /public/media (videos) and /public/art (images).
// For the apps, a short muted autoplay loop beats a screenshot every time.
export const projects: Project[] = [
  {
    index: "01",
    title: "Trackr",
    kind: "app",
    category: "FULL-STACK · LOCAL-FIRST",
    mantra: "Track anything. Make it yours.",
    description:
      "A modular tracker that bends to you, not the other way around. Local-first so it works instantly offline, then syncs to the cloud with row-level-secure auth. Build any structure you want — habits, moods, reps, books — from one schema.",
    media: {
      type: "video",
      src: "/media/trackr.mp4",
      poster: "/media/trackr.jpg",
    },
    stack: ["React", "TypeScript", "Vite", "Dexie", "Supabase"],
    links: { live: "https://trackr.app", source: "https://github.com/" },
  },
  {
    index: "02",
    title: "segment-rater",
    kind: "app",
    category: "OAUTH · THIRD-PARTY API",
    mantra: "Rate the moment, not just the song.",
    description:
      "Score a track second-by-second instead of one blunt star rating. Authenticates with Spotify OAuth, pulls real playback data, and turns it into shareable rating timelines. Live, with real users.",
    media: {
      type: "video",
      src: "/media/segment-rater.mp4",
      poster: "/media/segment-rater.jpg",
    },
    stack: ["Next.js", "Supabase", "Spotify OAuth"],
    links: { live: "https://segment-rater.app", source: "https://github.com/" },
  },
  {
    index: "03",
    title: "Layered",
    kind: "design",
    category: "PRODUCT DESIGN · BRAND",
    mantra: "Skincare, social by design.",
    description:
      "End-to-end brand and product design for a skincare/makeup social app. Owned the brand system, design library, and Figma deliverables — type, palette, components, and the face-detection annotation motif that ties the identity together.",
    media: { type: "image", src: "/art/layered-board.jpg" },
    stack: ["Figma", "Brand System", "UI/UX", "Design Library"],
    links: { live: "https://www.figma.com/" },
    demos: [
      {
        src: "/demos/layered-wave-hero.html",
        title: "layered — wave hero",
        poster: "/art/layered-wave.jpg",
      },
      {
        src: "demos/layered-final-direction.html",
        title: "layered — final direction",
        poster: "/art/layered-wave.jpg",
      },
      // add more as you build them
    ],
  },
  {
    index: "04",
    title: "GameNite",
    kind: "app",
    category: "REALTIME · MULTIPLAYER",
    mantra: "Party games, built to sync.",
    description:
      "A multiplayer party-game platform where every client stays in lockstep over websockets. Capstone project — handled the realtime state, room logic, and the reconnection edge cases that make or break live multiplayer.",
    media: {
      type: "video",
      src: "/media/gamenite.mp4",
      poster: "/media/gamenite.jpg",
    },
    stack: ["React", "TypeScript", "Socket.io", "Node"],
    links: { live: "https://gamenite.app", source: "https://github.com/" },
  },
];
