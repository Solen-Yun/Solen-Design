/* Component metadata only — the live demo and gallery preview live in
   push-navigation-stack-demo.jsx, the framework source texts and the prompt in
   push-navigation-stack-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "push-navigation-stack",
  name: "推入导航栈",
  href: "push-navigation-stack.html",
  title: "推入导航栈",
  description: "300×500 iOS 导航：点列表项详情屏自右推入，下层屏左移微暗；大标题过渡到顶栏；边缘右滑返回。",

  cardDescription: "详情推入、下层后退、边缘滑返。",

  demoHint: "点列表项推入，右缘左滑返回。",



  api: [
  {
    "name": "height",
    "type": "number",
    "default": "500",
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
