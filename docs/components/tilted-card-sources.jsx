import { API } from "./tilted-card.jsx";
import entrySource from "../../src/components/tilted-card/TiltedCard.jsx?raw";
import cssSource from "../../src/components/tilted-card/TiltedCard.css?raw";
import specSource from "../../src/components/tilted-card/SPEC.md?raw";

const DEP_NOTE = "上方安装命令会自动添加这些依赖。如果手动复制源码，请自行安装。";

export default {
  frameworks: [
    {
      name: "React",
      install: "npm install solen-design react react-dom",
      dependencies: {
        note: DEP_NOTE,
        npm: "npm install react react-dom",
        pnpm: "pnpm add react react-dom",
        yarn: "yarn add react react-dom",
        bun: "bun add react react-dom",
      },
      files: [
        { name: "TiltedCard.jsx", code: entrySource },
        { name: "TiltedCard.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { TiltedCard, TiltedCardLayer } from "solen-design/react";

<TiltedCard
  imageSrc="/cover.jpg"
  altText="封面"
  captionText="点一下翻面"
  containerWidth={300}
  containerHeight={236}
  imageWidth={300}
  imageHeight={236}
  radius={16}
  rotateAmplitude={12}
  scaleOnHover={1.05}
  smoothness={0.6}
  glare={0.5}
  glareColor="#ffffff"
  shadow={0.5}
  parallax={1}
  axis="both"
  showTooltip={true}
  floating={false}
  trackWindow={false}
  backContent={<div>背面</div>}
  onClick={() => console.log("clicked")}
>
  <TiltedCardLayer depth={40}>
    <span>浮层文字</span>
  </TiltedCardLayer>
</TiltedCard>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
