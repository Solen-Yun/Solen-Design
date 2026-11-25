import { createRoot } from "react-dom/client";
import { AnimatedList } from "../src/react/index.js";

/* The standalone preview — dark and light framed lists side by side on the
   dark canvas; scroll, hover and arrow through them. */
const ICONS = ["📁", "🖼️", "🎬", "📝", "💻", "🎨", "🎵", "📊", "📕", "📽️"];
const TITLES = ["Brand assets", "Launch hero.png", "Product tour.mp4", "Pricing notes", "landing-page.tsx", "Onboarding flow", "Ambient loop.wav", "Q3 forecast", "Brand guidelines.pdf", "Investor update"];
const DESCS = ["24 files", "2.4 MB", "148 MB", "1,240 words", "12 KB", "38 frames", "9.1 MB", "4 sheets", "6.8 MB", "22 slides"];
const METAS = ["2m", "18m", "1h", "3h", "5h", "8h", "1d", "1d", "2d", "3d"];

const items = Array.from({ length: 10 }, (_, index) => ({
  id: `file-${index}`,
  icon: <span style={{ fontSize: 18, lineHeight: 1 }}>{ICONS[index]}</span>,
  title: TITLES[index],
  description: DESCS[index],
  meta: METAS[index],
}));

createRoot(document.getElementById("root")).render(
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 48,
      flexWrap: "wrap",
      background: "#101014",
      padding: "48px 24px",
    }}
  >
    <AnimatedList items={items} theme="dark" width={380} maxHeight={340} initialSelectedIndex={1} />
    <AnimatedList items={items} theme="light" width={380} maxHeight={340} animation="slide" />
  </div>,
);
