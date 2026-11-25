import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/blob-cursor-demo.jsx";
import sources from "./components/blob-cursor-sources.jsx";
import blobCursor from "./components/blob-cursor.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...blobCursor} Demo={Demo} {...sources} />,
);
