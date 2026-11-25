import { createRoot } from "react-dom/client";
import { InfiniteMenu } from "../src/react/index.js";

/* The standalone preview — the component alone, no workbench chrome. */
const items = [
  {
    image: "./assets/wallpaper-01.jpg",
    title: "Neon Crossing",
    description: "Neon rain on a night crossing, doubled in the wet pavement.",
  },
  {
    image: "./assets/wallpaper-03.jpg",
    title: "Petals at Dusk",
    description: "A shrine gate and cherry blooms under a sinking sun.",
  },
  {
    image: "./assets/wallpaper-08.jpg",
    title: "Aurora Lake",
    description: "Green light over still water and winter peaks.",
  },
];

createRoot(document.getElementById("root")).render(
  <div style={{ width: "100%", minHeight: "100vh", display: "grid", placeItems: "center", background: "#0b0b0f" }}>
    <div style={{ width: "min(100%, 1280px)" }}>
      <InfiniteMenu
        items={items}
        count={160}
        tileSize={0.63}
        roundness={0.2}
        zoom={1.65}
        pullBack={1}
        stretch={0.6}
        inertia={0.6}
        autoplay={3}
        grayscale
        dim={0.5}
        intro
        showInfo
        theme="dark"
        accentColor="#ffffff"
        backgroundColor="#0b0b0f"
      />
    </div>
  </div>,
);
