import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/dither-demo.jsx";
import sources from "./components/dither-sources.jsx";
import dither from "./components/dither.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...dither} Demo={Demo} {...sources} />,
);
