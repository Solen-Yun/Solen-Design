import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/cart-drawer-demo.jsx";
import sources from "./components/cart-drawer-sources.jsx";
import cartDrawer from "./components/cart-drawer.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...cartDrawer} Demo={Demo} {...sources} />,
);
