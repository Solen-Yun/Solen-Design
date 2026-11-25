import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/testimonial-columns-demo.jsx";
import sources from "./components/testimonial-columns-sources.jsx";
import testimonialColumns from "./components/testimonial-columns.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...testimonialColumns} Demo={Demo} {...sources} />,
);
