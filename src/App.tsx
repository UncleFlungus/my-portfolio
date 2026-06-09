import { Hero } from "./components/Hero";
import { Works } from "./components/Works";
import { ArtFeature } from "./components/ArtFeature";
import { ReactLenis } from "lenis/react";

export default function App() {
  return (
    <ReactLenis root>
      <Hero />
      <Works />
      <ArtFeature
        src="/art/oni.jpg"
        title="uncleflungus"
        caption="experimental character work & illustration"
      />
    </ReactLenis>
  );
}
