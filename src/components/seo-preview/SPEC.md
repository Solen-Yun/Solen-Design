# SEO 预览调优台 — SeoPreview

一个 340×340 的搜索优化编辑场景：上半是 Title 与 Description 两个输入框，各配一枚 3px 字数用量条和「N / 上限」计数，逐键同步；下半通过「Search result / Link share」两个页签切换两种预览——搜索引擎结果页样式（品牌圆点头像、域名路径、蓝色标题行、两行灰色摘要）或社交分享卡样式（118px 宽渐变图区 + 标题、摘要、域名），文字实时取自输入框。

## 布局与材质

- 340×340px 场景，圆角 30px，溢出裁切，底色表面色，外圈 1px 线色描边加 0 30px 60px -36px 强阴影，文字墨色。响应式行为是整景等比缩放：容器窄于 340px 时按「可用宽度 ÷ 340」缩放（不超过 1 倍），内部不重排。
- 表单区：绝对定位 left/right 16px、top 14px。标签行两端对齐（首个上边距 0，其余 8px）：左侧标签 "Title" / "Description" 10px/字重 850 次级墨色，右侧计数等宽数字、字重 800 三级墨色，超限时变 #E11D48。
- Title 输入框：高 32px、宽 100%、上边距 4px、内边距 0 10px、圆角 9px、背景次表面色、内嵌 1.5px 线色描边、11px/字重 700、无外框；聚焦时内嵌描边变 2px accent。Description 文本域：高 44px、内边距 6px 10px、行高 1.4、11px/字重 600、不可拉伸，聚焦描边同上。
- 用量条：高 3px、上边距 4px、圆角 2px、底槽第三表面色；填充初始 #10B981，宽度 0.2s、颜色 0.2s 过渡——占比 85% 以上未超限时变 #F59E0B，超限变 #E11D48。
- 页签行：绝对定位 left 16px、top 160px，flex 间距 4px，容器 role="tablist" aria-label="Preview type"。页签按钮高 26px、内边距 0 10px、圆角 8px、无底色、10.5px/字重 850、三级墨色；选中态（aria-selected）背景次表面色、文字墨色。两个页签：Search result、Link share。
- 预览区：绝对定位 left/right 12px、top 190px、bottom 12px；两块面板各铺满、圆角 16px，透明度 0.3s、位移 0.4s cubic-bezier(.3,1.3,.5,1) 过渡。
- 搜索结果面板：内边距 12px 14px，白底、描边 0 0 0 1px rgba(0,0,0,.08)、文字 #202124、字体 Arial、system-ui、sans-serif。头部 flex 间距 8px：22px 圆形头像（135deg 渐变 #FBBF24 → #F472B6，外圈 0 0 0 1px rgba(0,0,0,.06)）、品牌名 "Solen" 11px/字重 600、路径 "https://solen.dev › builder" 10px #4d5156。标题 14.5px/行高 1.3、字重 400、链接蓝 #1a0dab、单行省略；摘要 11px/行高 1.45、#4d5156、两行截断。
- 分享卡面板：flex、背景次表面色、内嵌 1px 线色描边；左侧图区宽 118px，背景 135deg 渐变 #6366F1 → #EC4899，左下角（left 12px、bottom 10px）压白色 "Lumen" 字样 15px/字重 900；右侧文字区内边距 12px——标题 12px/行高 1.35、字重 850、两行截断，摘 要上边距 5px、10px/行高 1.4、字重 600、三级墨色、两行截断，域名 "solen.dev" 上边距 6px、9.5px/字重 800、三级墨色。
- 场景令牌浅色深色两套（`prefers-color-scheme: dark` 切换）：表面 #FFFFFF/#13141C、次表面 #F5F3EF/#1A1B25、第三表面 #EAE7E1/#252632、墨色 #16151B/#F4F0E8、次级墨色 #57535F/rgba(244,240,232,.68)、三级墨色 #8E8A97/rgba(244,240,232,.42)、线色 rgba(22,21,27,.09)/rgba(255,255,255,.08)、accent #6A57F2/#B7A4FF。搜索结果面板两种主题下都保持白底浅字。页签按钮 focus-visible 外圈 2px accent、偏移 2px。

## 数据

- 默认文案：Title 输入框 "Solen site builder"；Description 文本域 "Build a brand site in 10 minutes without code, and finish domains and SEO in one go."
- 上限写死：Title 60、Description 155；计数按字符加权——韩文字符（Unicode 0x3131–0xD79D 区间）按 1.8 个计、其余按 1 个计，四舍五入后显示为「N / 上限」。
- 预览固定字段：搜索面板品牌名 "Solen"、路径 "https://solen.dev › builder"；分享卡图区文字 "Lumen"、域名 "solen.dev"。

## 操作和动效

- 逐键同步：两个输入框监听 input 事件，即时重算字数与占比——用量条宽度按「计数 ÷ 上限」充填（封顶 100%），计数与颜色按 85%/100% 两档切换；两组预览的标题与摘要文本即时替换。
- 页签切换：点击在两种预览间切换——当前面板淡出并上移 10px，另一面板自下 10px 淡入（透明度 0.3s、位移 0.4s cubic-bezier(.3,1.3,.5,1)）；aria-selected 与 roving tabIndex（选中 0、其余 -1）同步；初始选中 Search result。隐藏面板 pointer-events 关闭。
- 键盘与无障碍：输入框带 aria-label（"Page title" / "Page description"），autocomplete 关闭；页签为原生 button + role="tab"，两个预览面板 role="tabpanel"；装饰头像与图区 aria-hidden。
- `prefers-reduced-motion` 下：面板切换与用量条的过渡全部移除——切换即换、用量条即长；计数、颜色分档与预览同步不变。

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| height | number | 340 | 场景高度，逻辑像素；窄容器整景按比例缩小 |
| reducedMotion | boolean | 跟随系统 | 覆盖系统的减少动态偏好 |

## 独立实现与六框架交付

- 仅凭本文从零生成可运行的实现。尺寸、颜色、文案、数据与运动参数均以上述文字为准；所有界面用 DOM 与 CSS 绘制，不加载远程图片、字体、视频或素材（头像与图区为纯渐变）。
- 当前交付重点为 React，组件名称 SeoPreview。从零创建四个文件：SeoPreview.tsx、SeoPreviewEngine.js、motion-runtime.ts、SeoPreviewEngine.d.ts；分别实现框架入口、完整交互核心、实例生命周期和类型声明。文件名是需要生成的产物，不假定接收者已经拥有任何文件。
- 同时提供 React、Vue、Svelte、Solid、Preact、Vanilla 原生生命周期入口，共享框架无关核心。DOM 仅在挂载后访问，支持同页多实例；更新选项不重挂载、状态保持，销毁时清理动画帧、计时器、观察器及监听器。不要用 iframe 代替组件实现。
- 依赖安装说明：npm install react react-dom。若使用依赖，只使用其公开 API；组件的布局、样式与算法必须在本次生成的文件中完整实现，不引用现成效果组件。
- 实现 options.height 以调整场景高度（默认 340），options.reducedMotion 覆盖系统偏好；减少动态时计数与预览同步仍正确。
- 给出每个文件的完整内容、安装和运行步骤、以下使用示例所需的全部实现。不得留省略号、待补素材或"自行补齐核心"的占位。
- 验收：375 / 768 / 1440px 无横向溢出；逐键同步、用量条三档颜色、超限计数、页签切换均正确；浅色深色两套令牌正确；多实例互不干扰，卸载后停止所有任务。

## 使用示例

```tsx
import { SeoPreview } from "./SeoPreview";

export default function App() {
  return <SeoPreview />;
}
```
