import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/gift-box-demo.jsx";
import sources from "./components/gift-box-sources.jsx";
import giftBox from "./components/gift-box.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...giftBox} Demo={Demo} {...sources} />,
);
