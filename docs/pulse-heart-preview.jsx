import { createRoot } from "react-dom/client";
import { PulseHeart } from "../src/react/index.js";

/* The standalone preview — the three built-in glyphs at different counts
   on the dark canvas; click each to watch the swell and digit roll. */
createRoot(document.getElementById("root")).render(
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 40,
      background: "#101014",
    }}
  >
    <PulseHeart defaultLiked={false} count={928} icon="heart" size={44} />
    <PulseHeart defaultLiked count={1024} icon="star" likedColor="#f5b400" />
    <PulseHeart defaultLiked={false} count={57} icon="thumb" likedColor="#22c55e" size={36} />
  </div>,
);
