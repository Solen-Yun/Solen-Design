import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/masonry-demo.jsx";
import sources from "./components/masonry-sources.jsx";
import masonry from "./components/masonry.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...masonry} Demo={Demo} {...sources} />,
);
