import { useState } from "react";
import { createRoot } from "react-dom/client";
import { PixelToggle } from "../src/react/index.js";

/* The standalone preview — the component alone, no workbench chrome.
   The switch drives this page's theme the same way it drives the
   workbench on the component page. Engine `checked` is DAY, so
   night = !checked. */

function currentNight() {
  const theme = document.documentElement.dataset.theme;
  if (theme === "dark") return true;
  if (theme === "light") return false;
  return Boolean(window.matchMedia?.("(prefers-color-scheme: dark)").matches);
}

function applySiteTheme(night) {
  const root = document.documentElement;
  root.dataset.theme = night ? "dark" : "light";
  root.style.colorScheme = night ? "dark" : "light";
  localStorage.setItem("solen-docs-theme", night ? "dark" : "light");
}

function App() {
  const [night, setNight] = useState(currentNight);
  return (
    <PixelToggle
      options={{
        checked: !night,
        onCheckedChange: (engineChecked) => {
          const nextNight = !engineChecked;
          setNight(nextNight);
          applySiteTheme(nextNight);
        },
      }}
    />
  );
}

createRoot(document.getElementById("root")).render(<App />);
