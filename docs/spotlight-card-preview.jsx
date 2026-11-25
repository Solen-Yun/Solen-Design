import { createRoot } from "react-dom/client";
import { default as SpotlightCard } from "../src/components/spotlight-card/SpotlightCard.jsx";

/* 独立预览 — 深色画布上两盏灯：默认圆池光跟随指针，右侧光束形
   从顶边垂下；移出卡片再靠近，看邻近范围把光提前点亮。 */
createRoot(document.getElementById("root")).render(
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "center",
      gap: 40,
      background: "#101014",
    }}
  >
    <SpotlightCard theme="dark" intensity={0.3} spotlightSize={240} proximity={100} style={{ width: 280 }}>
      <h3 style={{ margin: 0, fontSize: 18, fontWeight: 600 }}>圆池光</h3>
      <p style={{ margin: "10px 0 0", fontSize: 13, lineHeight: 1.5, opacity: 0.65 }}>
        光斑跟随指针，边框朝光一侧泛出轮辋光。
      </p>
    </SpotlightCard>
    <SpotlightCard
      theme="dark"
      shape="beam"
      spotlightColor="#8ab4ff"
      intensity={0.3}
      spotlightSize={280}
      softness={0.8}
      style={{ width: 200, height: 260 }}
    >
      <p style={{ margin: "auto 0", fontSize: 13, opacity: 0.65 }}>光束形</p>
    </SpotlightCard>
  </div>,
);
