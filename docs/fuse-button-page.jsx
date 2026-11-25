import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/fuse-button-demo.jsx";
import sources from "./components/fuse-button-sources.jsx";
import fuseButton from "./components/fuse-button.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...fuseButton} Demo={Demo} {...sources} />,
);
