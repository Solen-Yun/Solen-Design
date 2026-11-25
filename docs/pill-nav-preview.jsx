import { createRoot } from "react-dom/client";
import { PillNav } from "../src/react/index.js";

/* The standalone preview — four postures on the dark canvas: light fill
   bar, dark joined capsule, glide mode, and tile items with a highlight. */
const items = [
  { label: "Home", href: "#" },
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

function Mark() {
  return <span style={{ fontSize: "0.9em", fontWeight: 700 }}>◐</span>;
}

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
    <PillNav items={items} logo={<Mark />} theme="light" intro={false} />
    <PillNav items={items} logo={<Mark />} theme="dark" layout="joined" itemStyle="pill" intro={false} />
    <PillNav items={items} theme="light" hoverEffect="glide" indicator="none" bounce={0.6} stretch={0.8} intro={false} />
    <PillNav
      items={items}
      logo={<Mark />}
      theme="dark"
      size="lg"
      itemStyle="pill"
      indicator="pill"
      highlightColor="#5227FF"
      intro={false}
    />
  </div>,
);
