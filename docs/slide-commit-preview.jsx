import { createRoot } from "react-dom/client";
import { SlideCommit } from "../src/react/index.js";

/* The standalone preview — three handles on the dark canvas: an instant
   confirm, a pending one with a 1.2s spinner, and one that always fails. */
createRoot(document.getElementById("root")).render(
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 36,
      background: "#101014",
    }}
  >
    <SlideCommit label="Slide to pay" doneLabel="Paid" width={280} height={56} />
    <SlideCommit
      label="Slide to deploy"
      doneLabel="Deployed"
      errorLabel="Deploy failed"
      width={280}
      height={56}
      onConfirm={() => new Promise((resolve) => setTimeout(resolve, 1200))}
    />
    <SlideCommit
      label="Slide to send"
      doneLabel="Sent"
      errorLabel="Send failed"
      width={280}
      height={56}
      onConfirm={() => {
        throw new Error("offline");
      }}
    />
  </div>,
);
