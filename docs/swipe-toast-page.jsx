import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/swipe-toast-demo.jsx";
import sources from "./components/swipe-toast-sources.jsx";
import swipeToast from "./components/swipe-toast.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...swipeToast} Demo={Demo} {...sources} />,
);
