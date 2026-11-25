import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/today-popup-demo.jsx";
import sources from "./components/today-popup-sources.jsx";
import todayPopup from "./components/today-popup.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...todayPopup} Demo={Demo} {...sources} />,
);
