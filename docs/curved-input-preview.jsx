import { createRoot } from "react-dom/client";
import { CurvedInput } from "../src/react/index.js";

/* The standalone preview — three arcs on the dark canvas: the default dark
   bar arching up, a light shallow one, and a negative sag with custom copy. */
createRoot(document.getElementById("root")).render(
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 40,
      background: "#101014",
    }}
  >
    <CurvedInput theme="dark" bend={28} width={460} placeholder="Enter your email" buttonText="Get Started" />
    <CurvedInput theme="light" bend={16} width={460} placeholder="Search the docs" buttonText="Search" />
    <CurvedInput
      theme="dark"
      bend={-22}
      width={460}
      placeholder="留下你的邮箱"
      buttonText="订阅"
      buttonColor="#A855F7"
      showIcon={false}
    />
  </div>,
);
