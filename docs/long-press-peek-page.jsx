import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/long-press-peek-demo.jsx";
import sources from "./components/long-press-peek-sources.jsx";
import longPressPeek from "./components/long-press-peek.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...longPressPeek} Demo={Demo} {...sources} />,
);
