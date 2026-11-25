import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/prismatic-burst-demo.jsx";
import sources from "./components/prismatic-burst-sources.jsx";
import prismaticBurst from "./components/prismatic-burst.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...prismaticBurst} Demo={Demo} {...sources} />,
);
