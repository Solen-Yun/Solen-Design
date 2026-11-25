import { useState } from "react";
import { SquishSwitch } from "../src/react/index.js";

/* The standalone preview — the component alone, no workbench chrome.
   Theme-following colors keep both states visible in light and dark. */
const COLORS = {
  trackColor: "var(--sd-border-strong)",
  trackOnColor: "var(--sd-accent)",
  thumbColor: "var(--sd-surface)",
  thumbOnColor: "var(--sd-surface)",
};

export default function Preview() {
  const [wifi, setWifi] = useState(true);
  const [bluetooth, setBluetooth] = useState(false);
  const [airplane, setAirplane] = useState(false);
  return (
    <div style={{ display: "grid", gap: 24, placeItems: "start", padding: 48 }}>
      <SquishSwitch checked={wifi} onChange={setWifi} label="Wi-Fi" {...COLORS} />
      <SquishSwitch checked={bluetooth} onChange={setBluetooth} label="Bluetooth" {...COLORS} />
      <SquishSwitch checked={airplane} onChange={setAirplane} label="Airplane mode" stretch={70} {...COLORS} />
    </div>
  );
}
