/* Component metadata only — the live demo and gallery preview live in
   article-paywall-demo.jsx, the framework source texts and the prompt in
   article-paywall-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "article-paywall",
  name: "文章会员付费墙",
  href: "article-paywall.html",
  title: "文章会员付费墙",
  description: "300×480 博客文章场景：读到第三段起文字渐隐截断，下方会员卡提示本月免费额度已用完，Unlock membership 展开订阅方案；继续阅读按钮供演示。",

  cardDescription: "文章渐隐截断，会员卡解锁。",

  demoHint: "滚动看截断与会员卡，点解锁看方案。",



  api: [
  {
    "name": "height",
    "type": "number",
    "default": "480",
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
