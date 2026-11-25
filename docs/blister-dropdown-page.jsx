import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/blister-dropdown-demo.jsx";
import sources from "./components/blister-dropdown-sources.jsx";
import blisterDropdown from "./components/blister-dropdown.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...blisterDropdown} Demo={Demo} {...sources} />,
);
