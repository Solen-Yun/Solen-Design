import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/parallax-mountains-demo.jsx";
import sources from "./components/parallax-mountains-sources.jsx";
import parallaxMountains from "./components/parallax-mountains.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...parallaxMountains} Demo={Demo} {...sources} />,
);
