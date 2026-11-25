import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/waitlist-position-demo.jsx";
import sources from "./components/waitlist-position-sources.jsx";
import waitlistPosition from "./components/waitlist-position.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...waitlistPosition} Demo={Demo} {...sources} />,
);
