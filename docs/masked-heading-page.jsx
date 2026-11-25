import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/masked-heading-demo.jsx";
import sources from "./components/masked-heading-sources.jsx";
import maskedHeading from "./components/masked-heading.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...maskedHeading} Demo={Demo} {...sources} />,
);
