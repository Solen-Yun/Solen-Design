import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/infinite-feed-demo.jsx";
import sources from "./components/infinite-feed-sources.jsx";
import infiniteFeed from "./components/infinite-feed.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...infiniteFeed} Demo={Demo} {...sources} />,
);
