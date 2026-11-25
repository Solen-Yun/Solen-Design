import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/clip-reveal-photos-demo.jsx";
import sources from "./components/clip-reveal-photos-sources.jsx";
import clipRevealPhotos from "./components/clip-reveal-photos.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...clipRevealPhotos} Demo={Demo} {...sources} />,
);
