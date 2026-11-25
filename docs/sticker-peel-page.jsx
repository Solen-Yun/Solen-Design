import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/sticker-peel-demo.jsx";
import sources from "./components/sticker-peel-sources.jsx";
import stickerPeel from "./components/sticker-peel.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...stickerPeel} Demo={Demo} {...sources} />,
);
