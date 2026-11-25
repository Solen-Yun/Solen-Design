import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/scroll-marquee-rows-demo.jsx";
import sources from "./components/scroll-marquee-rows-sources.jsx";
import scrollMarqueeRows from "./components/scroll-marquee-rows.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...scrollMarqueeRows} Demo={Demo} {...sources} />,
);
