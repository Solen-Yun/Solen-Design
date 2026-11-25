import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/jelly-radio-demo.jsx";
import sources from "./components/jelly-radio-sources.jsx";
import jellyRadio from "./components/jelly-radio.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...jellyRadio} Demo={Demo} {...sources} />,
);
