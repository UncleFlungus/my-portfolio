import { Hero } from "./components/Hero";
import { Works } from "./components/Works";
// import { ArtFeature } from "./components/ArtFeature";
import { ReactLenis } from "lenis/react";
import { Contact } from "./components/Contact";
import { SelectedArt} from "./components/SelectedArt";
export default function App() {
  return (
    <ReactLenis root>
      <Hero />
      <Works />
      <SelectedArt />
      <Contact />
      {/* <ArtFeature
        src="/art/oni.jpg"
        title="uncleflungus"
        caption="experimental character work & illustration"
      /> */}
    </ReactLenis>
  );
}
