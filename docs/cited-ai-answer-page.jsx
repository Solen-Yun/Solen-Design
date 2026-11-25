import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/cited-ai-answer-demo.jsx";
import sources from "./components/cited-ai-answer-sources.jsx";
import citedAiAnswer from "./components/cited-ai-answer.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...citedAiAnswer} Demo={Demo} {...sources} />,
);
