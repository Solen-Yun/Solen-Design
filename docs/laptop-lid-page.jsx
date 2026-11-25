import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/laptop-lid-demo.jsx";
import sources from "./components/laptop-lid-sources.jsx";
import laptopLid from "./components/laptop-lid.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...laptopLid} Demo={Demo} {...sources} />,
);
