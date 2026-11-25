import entrySource from "../../src/components/squish-switch/SquishSwitch.jsx?raw";
import cssSource from "../../src/components/squish-switch/SquishSwitch.css?raw";
import specSource from "../../src/components/squish-switch/SPEC.md?raw";


export default {
  frameworks: [
    {
      name: "React",
      install: "npm install solen-design react react-dom motion",
      dependencies: {
        note: "这个组件依赖 Motion（npm install motion），是库内唯一带运行时依赖的组件。",
        npm: "npm install react react-dom motion",
        pnpm: "pnpm add react react-dom motion",
        yarn: "yarn add react react-dom motion",
        bun: "bun add react react-dom motion",
      },
      files: [
        { name: "SquishSwitch.jsx", code: entrySource },
        { name: "SquishSwitch.css", code: cssSource },
      ],
      api: [
        { name: "checked", type: "boolean", default: "undefined", description: "受控状态；不传则组件自持状态" },
        { name: "defaultChecked", type: "boolean", default: "false", description: "非受控时的初始状态" },
        { name: "onChange", type: "(checked: boolean) => void", default: "—", description: "轻点、拖过中线或键盘激活时回调" },
        { name: "label", type: "string", default: '""', description: "开关旁的标签，与开关关联" },
        { name: "disabled", type: "boolean", default: "false", description: "置灰且不可交互" },
        { name: "trackColor", type: "string", default: '"#27272a"', description: "关态轨道颜色" },
        { name: "trackOnColor", type: "string", default: '"#f5f5f5"', description: "开态轨道颜色" },
        { name: "thumbColor", type: "string", default: '""', description: "关态滑块颜色；留空自动向轨道混色" },
        { name: "thumbOnColor", type: "string", default: '""', description: "开态滑块颜色；留空用关态轨道色" },
        { name: "width", type: "number", default: "76", description: "轨道宽度（px）" },
        { name: "height", type: "number", default: "38", description: "轨道高度（px），滑块与内边距随之推导" },
        { name: "radius", type: "number", default: "19", description: "轨道圆角（px），上限为高度一半" },
        { name: "speed", type: "number", default: "50", description: "落定弹簧刚度（0–100），低懒高脆" },
        { name: "stretch", type: "number", default: "36", description: "随速度的拉伸量（0–100），面积保持不变" },
        { name: "hoverScale", type: "number", default: "1.035", description: "悬停时滑块胀大到该倍率" },
        { name: "colorDuration", type: "number", default: "320", description: "颜色交叉渐变时长（ms）" },
        { name: "ariaLabel", type: "string", default: "—", description: "无标签时的可访问名称" },
        { name: "className", type: "string", default: '""', description: "根元素附加类名" },
        { name: "id", type: "string", default: "—", description: "开关按钮的 id，label 通过它关联" },
      ],
      usage: [
        {
          file: "App.jsx",
          code: `import { useEffect, useState } from "react";
import { SquishSwitch } from "solen-design/react";

const [wifi, setWifi] = useState(false);

<SquishSwitch
  checked={wifi}
  onChange={setWifi}
  label="Wi-Fi"
  speed={50}
  stretch={36}
/>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
