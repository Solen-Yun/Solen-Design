import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/feature-vote-board-demo.jsx";
import sources from "./components/feature-vote-board-sources.jsx";
import featureVoteBoard from "./components/feature-vote-board.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...featureVoteBoard} Demo={Demo} {...sources} />,
);
