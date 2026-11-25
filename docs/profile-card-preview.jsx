import { createRoot } from "react-dom/client";
import { ProfileCard } from "../src/react/index.js";

/* The standalone preview — the dark card and a recoloured backdrop card on
   the dark canvas; move the pointer to tilt, watch the foil slide under. */

const svgPattern = () =>
  `./assets/demo-photos/photo-02.jpg`;

const photo = "./assets/demo-photos/photo-01.jpg";
const pattern = svgPattern();

createRoot(document.getElementById("root")).render(
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 56,
      background: "#101014",
    }}
  >
    <ProfileCard
      avatarUrl={photo}
      iconUrl={pattern}
      name="林晚星"
      title="界面工程师 · Solen Design"
      handle="wanxing"
      status="在线"
      contactText="联系"
      theme="dark"
      intro={true}
    />
    <ProfileCard
      avatarUrl={photo}
      iconUrl={pattern}
      name="苏叶知"
      title="动效设计师 · Solen Design"
      handle="suyezhi"
      status="离开"
      statusColor="#f59e0b"
      contactText="联系"
      theme="dark"
      backdropColor="#5e2a4d"
      tiltStrength={16}
      parallax={10}
      intro={false}
    />
  </div>,
);
