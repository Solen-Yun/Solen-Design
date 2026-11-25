import entrySource from "../../src/components/tech-text/TechText.jsx?raw";
import cssSource from "../../src/components/tech-text/TechText.css?raw";
import specSource from "../../src/components/tech-text/SPEC.md?raw";


export default {
  frameworks: [
    {
      name: "React",
      install: "npm install solen-design react react-dom",
      dependencies: {
        note: "上方安装命令会自动添加这些依赖。如果手动复制源码，请自行安装。",
        npm: "npm install react react-dom",
        pnpm: "pnpm add react react-dom",
        yarn: "yarn add react react-dom",
        bun: "bun add react react-dom",
      },
      files: [
        { name: "TechText.jsx", code: entrySource },
        { name: "TechText.css", code: cssSource },
      ],
      api: [
        { name: "text", type: "string", default: '"Solen"', description: "要渲染的字标" },
        { name: "fontFamily", type: "string", default: '""', description: "页面已加载的字体族；留空继承容器字体" },
        { name: "fontWeight", type: "number", default: "600", description: "字标字重" },
        { name: "fontSize", type: "number", default: "150", description: "最大字号（px），窄容器自动缩小适配" },
        { name: "letterSpacing", type: "number", default: "-0.05", description: "字距（em）" },
        { name: "align", type: '"left" | "center" | "right"', default: '"center"', description: "字标在容器内的水平位置" },
        { name: "color", type: "string", default: '"currentColor"', description: "字母与轮廓颜色，默认跟随周围文字色" },
        { name: "accentColor", type: "string", default: '"currentColor"', description: "选中框、连接线、碎屑与标注的颜色" },
        { name: "reveal", type: '"area" | "letter" | "off"', default: '"letter"', description: "区域镜头内轮廓化 / 仅活动字母 / 关闭" },
        { name: "reach", type: "number", default: "200", description: "轮廓化半径（px）" },
        { name: "softness", type: "number", default: "0.7", description: "填充到轮廓的过渡柔和度，0 为硬边" },
        { name: "dashLength", type: "number", default: "4", description: "轮廓虚线段长（px）" },
        { name: "dashGap", type: "number", default: "2", description: "轮廓虚线间隔（px）" },
        { name: "lineStyle", type: '"dashed" | "solid"', default: '"dashed"', description: "轮廓线型，均只描外轮廓" },
        { name: "strokeWidth", type: "number", default: "1.5", description: "轮廓描边粗细（px）" },
        { name: "specks", type: "number", default: "15", description: "活动字母周围闪烁重生的像素碎屑数量，0 关闭" },
        { name: "selection", type: "boolean", default: "true", description: "框选指针下的字母，框在字母间滑行" },
        { name: "labels", type: "boolean", default: "true", description: "框上标注字符与尺寸，拖动时标注偏移量" },
        { name: "draggable", type: "boolean", default: "true", description: "字母可拖离基线，松手弹簧送回" },
        { name: "bounce", type: "number", default: "0.4", description: "回弹过冲量，0 无 – 1 很弹" },
        { name: "clickKick", type: "boolean", default: "true", description: "点击字母向上弹起并向邻居传递冲击波" },
        { name: "intro", type: '"none" | "type" | "assemble" | "metrics"', default: '"none"', description: "进入视口的入场动画：打字 / 像素汇聚 / 度量标线" },
        { name: "introDuration", type: "number", default: "2", description: "入场时长（秒）" },
        { name: "guides", type: "boolean", default: "false", description: "字母活动时标出基线、x 高度、大写高度与降部" },
        { name: "sweep", type: "boolean", default: "true", description: "指针离开时自动巡游揭示" },
        { name: "speed", type: "number", default: "1", description: "巡游速度倍率" },
        { name: "className", type: "string", default: '""', description: "容器附加类名" },
        { name: "style", type: "CSSProperties", default: "—", description: "容器内联样式" },
      ],
      usage: [
        {
          file: "App.jsx",
          code: `import { TechText } from "solen-design/react";

<div style={{ width: "100%", height: 480, position: "relative" }}>
  <TechText text="Solen Design" reveal="letter" clickKick />
</div>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
