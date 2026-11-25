/* Docs-only theme control.

   深色模式在部分 Windows GPU 上滚动时闪烁（color-scheme: dark 会改变
   Chromium 的光栅化路径，与页面写法无关），工作台钉死浅色：内联
   color-scheme=light + data-theme=light。库里 light-dark() 的令牌能力
   不受影响；要恢复双主题，回退本文件的 git 历史即可。 */

const root = document.documentElement;
root.style.colorScheme = "light";
root.dataset.theme = "light";
