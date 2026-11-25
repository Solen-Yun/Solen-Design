import { createRoot } from "react-dom/client";
import { ElasticMesh } from "../src/react/index.js";

/* The standalone preview — balloon and jelly materials side by side on
   the dark canvas; hover dents them, drag stretches, click pokes. */
createRoot(document.getElementById("root")).render(
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 48,
      background: "#101014",
    }}
  >
    <div style={{ width: "min(92vw, 720px)", height: 300 }}>
      <ElasticMesh text="Squish" color="#3b5bff" material="balloon" intro={false} />
    </div>
    <div style={{ width: "min(92vw, 720px)", height: 300 }}>
      <ElasticMesh text={"Jelly\nBlob"} color="#f472b6" material="jelly" intro={false} theme="dark" />
    </div>
  </div>,
);
