import { createRoot } from "react-dom/client";
import { SwipeToast } from "../src/react/index.js";

/* 独立预览 — 深色画布上摆三种姿态：右下角固定定位的默认吐司、
   带操作按钮的内联吐司和浅色反色的顶边引信；下滑甩动与引信暂停都能试。 */

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
    <SwipeToast
      title="文件已归档"
      description="按住往下滑，拖过阈值或快速一甩就送走它"
      open={true}
      actionLabel="撤销"
      duration={8000}
    />
    <SwipeToast
      inline
      title="草稿已保存"
      description="鼠标停在卡上，引信会暂停等你读完"
      open={true}
      duration={12000}
      width={340}
    />
    <SwipeToast
      inline
      title="已连接到设备"
      description="浅色卡、顶部引信、带关闭按钮"
      open={true}
      background="#fafafa"
      color="#27272a"
      fuseColor="#3b82f6"
      fuse="top"
      closeButton={true}
      duration={12000}
      width={340}
    />
  </div>,
);
