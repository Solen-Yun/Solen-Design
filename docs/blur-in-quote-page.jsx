import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/blur-in-quote-demo.jsx";
import sources from "./components/blur-in-quote-sources.jsx";
import blurInQuote from "./components/blur-in-quote.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...blurInQuote} Demo={Demo} {...sources} />,
);
