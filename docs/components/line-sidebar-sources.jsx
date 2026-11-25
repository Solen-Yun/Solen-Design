import entrySource from "../../src/components/line-sidebar/LineSidebar.jsx?raw";
import cssSource from "../../src/components/line-sidebar/LineSidebar.css?raw";
import specSource from "../../src/components/line-sidebar/SPEC.md?raw";


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
        { name: "LineSidebar.jsx", code: entrySource },
        { name: "LineSidebar.css", code: cssSource },
      ],
      api: [
        { name: "items", type: "string[]", default: "12 项默认列表", description: "侧边栏条目标签" },
        { name: "accentColor", type: "string", default: '"#A855F7"', description: "指针接近时文字与标记线染向的颜色" },
        { name: "textColor", type: "string", default: '"#c4c4c4"', description: "文字静止颜色（默认面向深色背景）" },
        { name: "markerColor", type: "string", default: '"#6c6c6c"', description: "标记线静止颜色" },
        { name: "showIndex", type: "boolean", default: "true", description: "显示两位序号" },
        { name: "showMarker", type: "boolean", default: "true", description: "显示标记线与间隙刻度线" },
        { name: "proximityRadius", type: "number", default: "100", description: "指针影响条目的垂直距离（px）" },
        { name: "maxShift", type: "number", default: "30", description: "满接近度时文字右移的最大像素" },
        { name: "falloff", type: '"linear" | "smooth" | "sharp"', default: '"smooth"', description: "指针距离到接近度的映射曲线" },
        { name: "markerLength", type: "number", default: "60", description: "标记线长度（px）" },
        { name: "markerGap", type: "number", default: "0", description: "标记线与标签的间距（px）" },
        { name: "tickScale", type: "number", default: "0.5", description: "刻度线长度相对 markerLength 的比例" },
        { name: "scaleTick", type: "boolean", default: "true", description: "刻度线随接近度生长" },
        { name: "itemGap", type: "number", default: "20", description: "条目垂直间距（px）" },
        { name: "fontSize", type: "number", default: "1.1", description: "标签字号（rem）" },
        { name: "smoothing", type: "number", default: "100", description: "接近度响应的平滑时长（ms）" },
        { name: "defaultActive", type: "number | null", default: "null", description: "挂载时选中的条目序号，仅初始生效" },
        { name: "onItemClick", type: "(index, label) => void", default: "—", description: "点击条目时回调，该条目同时成为选中态" },
        { name: "className", type: "string", default: '""', description: "根节点附加类名" },
      ],
      usage: [
        {
          file: "App.jsx",
          code: `import { LineSidebar } from "solen-design/react";

<LineSidebar
  items={["Overview", "Components", "Animations"]}
  accentColor="#A855F7"
  defaultActive={0}
  onItemClick={(index, label) => console.log(index, label)}
/>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
