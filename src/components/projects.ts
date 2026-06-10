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

// Drop real assets in /public/media (videos + poster jpgs) and /public/art (images/screens).
// For the apps, a short muted autoplay loop beats a screenshot every time.
// `demos` renders the stacked DemoCarousel; works with .jpg/.png, .mp4/.webm, or .html.
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
      src: "/demos/bday_tracker_demo.mp4",
      poster: "/media/trackr.jpg",
    },
    stack: ["React", "TypeScript", "Vite", "Dexie", "Supabase"],
    links: { live: "https://trackr-7l9z.vercel.app/landing" },
  },

  {
    index: "02",
    title: "GameNite",
    kind: "app",
    category: "REALTIME · FRONTEND LEAD",
    mantra: "Less launcher, more hangout.",
    description:
      "A real-time multiplayer platform extended with three interlocking social features — a Mafia social-deduction game, global leaderboards, and an enhanced chat — designed to feed each other into a hangout rather than a bare game launcher. I led the frontend across all three: the phase-based Mafia UI (night/day/vote, spectator mode, and the game-over role reveal), the leaderboard pages with timeframe filters and a Top-10 lobby widget, and the chat and Mafia-component test suites (per-phase/per-role render branches, @mention extraction, and private-channel isolation). I also defined the shared TypeScript types the team built against, so frontend and backend could develop in parallel on mock data and swap to live APIs without friction.",
    media: { type: "image", src: "/art/gamenite_nightphase.jpg" },
    stack: [
      "React",
      "TypeScript",
      "Socket.io",
      "Node",
      "MongoDB",
      "Playwright",
    ],
    links: {},
    demos: [
      {
        src: "/art/gamenite_nightphase.png",
        title: "Mafia — night phase",
        poster: "/art/gamenite_nightphase.png",
      },
      {
        src: "/art/gamenite_dayphase.png",
        title: "Mafia — vote & reveal",
        poster: "/art/gamenite_dayphase.png",
      },
      {
        src: "/art/gamenite_mafialeaderboard.png",
        title: "leaderboard + timeframe filters",
        poster: "/art/gamenite_mafialeaderboard.png",
      },
      {
        src: "/art/gamenite_gameover.png",
        title: "leaderboard + timeframe filters",
        poster: "/art/gamenite_gameover.png",
      },
      {
        src: "/art/gamenite_gifchat.png",
        title: "GIF + @mention chat",
        poster: "/art/gamenite_gifchat.png",
      },
    ],
  },
  {
    index: "03",
    title: "Rebound Hound",
    kind: "app",
    category: "GAMEPLAY · SYSTEMS · C# · UNITY",
    mantra: "Modular systems, built to scale.",
    description:
      "A top-down action roguelike where you play a dog ricocheting tennis balls like a pinball. Capstone project — architected the reusable systems behind it: configurable enemy AI driven by inspector flags, cross-scene state persistence for abilities and stat modifiers, and procedural level selection that builds a run from 9 of 13 rooms plus a boss. Sole artist and gameplay/systems programmer on a team of 5.",
    media: {
      type: "video",
      src: "/demos/reboundhound_demo.mp4",
      poster: "/media/gamenite.jpg",
    },
    stack: ["Unity", "C#", "Game Architecture", "State Machines"],
    links: {
      live: "https://iswearthisisntme.itch.io/rebound-hound",
    },
  },

  {
    index: "04",
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
        src: "/art/layered_appui.png",
        title: "Layered App UI",
        poster: "/art/gamenite_nightphase.png",
      },
      {
        src: "/art/layered_landing.png",
        title: "Landing page mock-up on figma",
        poster: "/art/gamenite_dayphase.png",
      },
      {
        src: "/art/layered_homeui.png",
        title: "Layered Home UI",
        poster: "/art/layered_homeui.png",
      },
    ],
  },
];
