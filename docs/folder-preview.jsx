import { createRoot } from "react-dom/client";
import { Folder } from "../src/react/index.js";

/* The standalone preview — three folders on the dark desk: a blue flap
   folder, a book-mode folder, and a glass folder; open, drag, drop. */
const items = [
  { title: "Brand guidelines", description: "Colors, type and voice" },
  { title: "Launch plan", description: "Milestones and owners" },
  { title: "Notes", description: "Assorted scribbles" },
];

createRoot(document.getElementById("root")).render(
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexWrap: "wrap",
      gap: 72,
      background: "linear-gradient(180deg, #16151c 0%, #101014 100%)",
      padding: "56px 24px",
    }}
  >
    <Folder label="Projects" items={items} mode="flap" variant="solid" color="#3d8bff" theme="dark" intro={false} />
    <Folder label="Archive" items={items} mode="book" variant="solid" color="#8b5cf6" tabPosition="left" layout="stack" theme="dark" intro={false} />
    <Folder label="Glass" items={items} mode="flap" variant="glass" color="#22c55e" frost={0.35} theme="dark" intro={false} />
  </div>,
);
