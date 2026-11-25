import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/recent-purchase-toast-demo.jsx";
import sources from "./components/recent-purchase-toast-sources.jsx";
import recentPurchaseToast from "./components/recent-purchase-toast.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...recentPurchaseToast} Demo={Demo} {...sources} />,
);
