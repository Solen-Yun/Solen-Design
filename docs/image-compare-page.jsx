import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/image-compare-demo.jsx";
import sources from "./components/image-compare-sources.jsx";
import imageCompare from "./components/image-compare.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...imageCompare} Demo={Demo} {...sources} />,
);
