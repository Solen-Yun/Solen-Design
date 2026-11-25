import { createRoot } from "react-dom/client";
import { Stepper } from "../src/react/index.js";
import { Step } from "../src/components/stepper/Stepper.jsx";

/* 弹性分步器：左边横版毛玻璃流，右边竖向左轨流；点不同步骤看高亮滑行回弹与内容换向。 */
const stepsH = [
  { title: "账户", body: "创建你的账户。" },
  { title: "偏好", body: "选择使用场景。" },
  { title: "确认", body: "确认并完成。" }
];

const stepsV = [
  { title: "填写信息", description: "姓名与联系方式", body: "第一步：填写基本信息。" },
  { title: "上传头像", description: "可选", body: "第二步：上传一张头像。" },
  { title: "邀请团队", description: "一起协作", body: "第三步：邀请你的团队。" },
  { title: "完成", description: "开始使用", body: "最后一步：一切就绪。" }
];

createRoot(document.getElementById("root")).render(
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 40,
      background: "#101014",
      flexWrap: "wrap",
    }}
  >
    <Stepper initialStep={2} frame theme="dark" accentColor="#0a84ff" width={420}>
      {stepsH.map((step) => (
        <Step key={step.title} title={step.title}>
          <p style={{ margin: "6px 0 0", fontSize: 14 }}>{step.body}</p>
        </Step>
      ))}
    </Stepper>
    <Stepper orientation="vertical" frame theme="dark" width={560}>
      {stepsV.map((step) => (
        <Step key={step.title} title={step.title} description={step.description}>
          <p style={{ margin: "6px 0 0", fontSize: 14 }}>{step.body}</p>
        </Step>
      ))}
    </Stepper>
  </div>,
);
