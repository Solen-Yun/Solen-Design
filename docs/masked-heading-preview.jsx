import { createRoot } from "react-dom/client";
import { MaskedHeading } from "../src/react/index.js";

/* The standalone preview — two gradient fills living inside the glyphs on the
   dark canvas: a warm mesh with the spotlight beam, and a cool aurora with a
   hollow outline; both drift and parallax under the pointer. */
const WARM = `./assets/demo-photos/photo-01.jpg`;
const COOL = `./assets/demo-photos/photo-02.jpg`;

createRoot(document.getElementById("root")).render(
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 96,
      background: "#101014",
      color: "#f4f4f5",
      padding: 48,
    }}
  >
    <MaskedHeading
      text="Designed in the details"
      mediaType="image"
      src={WARM}
      reveal="rise"
      trigger="mount"
      drift={18}
      parallax={26}
      spotlight
      spotlightRadius={180}
    />
    <MaskedHeading
      text="Colour wears the words"
      mediaType="image"
      src={COOL}
      reveal="wipe"
      trigger="mount"
      drift={14}
      parallax={18}
      outline
      outlineColor="#f4f4f5"
    />
  </div>,
);
