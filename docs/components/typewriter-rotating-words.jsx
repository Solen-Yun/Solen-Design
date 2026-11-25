/* Component metadata only — the live demo and gallery preview live in
   typewriter-rotating-words-demo.jsx, the framework source texts and the prompt in
   typewriter-rotating-words-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "typewriter-rotating-words",
  name: "打字机轮换关键词",
  href: "typewriter-rotating-words.html",
  title: "打字机轮换关键词",
  description: "340×272 hero 场景：句子末尾的关键词按打字机方式删除重打（含光标闪烁），词库轮换；悬停暂停轮换。",

  cardDescription: "末词打字机删除重打轮换。",

  demoHint: "看关键词打删轮换；悬停暂停。",



  api: [
  {
    "name": "height",
    "type": "number",
    "default": "272",
    "description": "场景高度，逻辑像素；窄容器整景按比例缩小"
  },
  {
    "name": "reducedMotion",
    "type": "boolean",
    "default": "跟随系统",
    "description": "覆盖系统的减少动态偏好"
  }
],
};
