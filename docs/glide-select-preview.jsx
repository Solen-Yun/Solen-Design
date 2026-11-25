import { createRoot } from "react-dom/client";
import { GlideSelect } from "../src/react/index.js";

/* The standalone preview — three chips with different selected values,
   sizes and alignments, all on the dark canvas; open and scrub them. */
const options = [
  { value: "linear", label: "Linear" },
  { value: "sigmoid", label: "Sigmoid" },
  { value: "softmax", label: "Softmax", tag: "推荐" },
  { value: "top-k", label: "Top-K" },
  { value: "beam", label: "Beam" },
];

createRoot(document.getElementById("root")).render(
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 32,
      background: "#101014",
    }}
  >
    <div style={{ display: "flex", gap: 24 }}>
      <GlideSelect options={options} defaultValue="linear" ariaLabel="采样策略" />
      <GlideSelect options={options} defaultValue="beam" size="lg" align="right" ariaLabel="解码策略" />
    </div>
    <GlideSelect options={options} defaultValue="softmax" size="sm" placement="top" ariaLabel="小型选择器" />
  </div>,
);
