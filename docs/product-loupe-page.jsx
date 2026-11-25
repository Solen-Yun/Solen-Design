import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/product-loupe-demo.jsx";
import sources from "./components/product-loupe-sources.jsx";
import productLoupe from "./components/product-loupe.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...productLoupe} Demo={Demo} {...sources} />,
);
