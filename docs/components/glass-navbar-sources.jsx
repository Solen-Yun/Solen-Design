import entrySource from "../../src/components/glass-navbar/GlassNavbar.jsx?raw";
import cssSource from "../../src/components/glass-navbar/GlassNavbar.css?raw";
import specSource from "../../src/components/glass-navbar/SPEC.md?raw";


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
        { name: "GlassNavbar.jsx", code: entrySource },
        { name: "GlassNavbar.css", code: cssSource },
      ],
      api: [
        { name: "items", type: "string[]", default: '["首页", "产品", "文档", "关于"]', description: "导航链接标签，靠右排列" },
        { name: "brand", type: "string", default: '"Solenio"', description: "左侧品牌文字" },
        { name: "defaultActive", type: "number", default: "0", description: "挂载时选中的链接序号" },
        { name: "onItemSelect", type: "(index, label) => void", default: "—", description: "点击链接时回调，该链接同时成为选中态" },
        { name: "pinned", type: "boolean", default: "true", description: "true 固定于视口跟随窗口滚动；false 在最近的滚动容器内 sticky" },
        { name: "shrink", type: "boolean", default: "true", description: "滚动超过阈值时从通栏收短为居中胶囊" },
        { name: "compactAt", type: "number", default: "40", description: "触发收短的滚动位置（px）" },
        { name: "compactWidth", type: "number", default: "608", description: "收短后的胶囊宽度（px）" },
        { name: "glassOpacity", type: "number", default: "0.72", description: "玻璃底色的不透明度，0–1" },
        { name: "blurRadius", type: "number", default: "14", description: "背景模糊半径（px）" },
        { name: "barColor", type: "string", default: '"#ffffff"', description: "玻璃底色，边框由文字色推导" },
        { name: "textColor", type: "string", default: '"#17181a"', description: "品牌与链接的墨色，未选中链接为其 60%" },
        { name: "className", type: "string", default: '""', description: "根节点附加类名" },
      ],
      usage: [
        {
          file: "App.jsx",
          code: `import { GlassNavbar } from "solen-design/react";

<GlassNavbar
  brand="Solenio"
  items={["首页", "产品", "文档", "关于"]}
  defaultActive={0}
  onItemSelect={(index, label) => console.log(index, label)}
/>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
