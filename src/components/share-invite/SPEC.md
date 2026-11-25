创建一个可独立运行的 Share & Invite 分享邀请组件，完整实现下面列出的界面、状态和动画。

画面与排版
- 场景最小高度 500px，背景 #f6f4f0，水平与垂直居中。字体栈 Inter, system-ui, sans-serif，不请求网络字体。正文 #23231f，次要文字 #898982，浅填充 #ecebe4，边框 #e5e3df。
- 初始展开：白色面板宽 320px、高约 376px，1px 边框，32px 圆角；阴影 0 16px 26px -14px #29272026 与 0 3px 6px -4px #29272026。内边距 8px。内容增加时高度自动增长。
- 顶部一行高 48px，左边是浅米灰标题胶囊，文字 Share "Q4 Plan"，16px/20px、600 字重、字距 -0.35px，左边 16px 线条分享图标；右边是 48×48px 圆形关闭按钮，两者间距 8px。
- 顶部下方 16px 是高 48px 的邮箱输入胶囊，左侧 17px 信封图标，提示 Add people by email；右侧白色角色按钮高 36px，14px/600，显示 Editor 与上下小箭头。输入字体 16px/24px，placeholder #aaa9a2。
- People with access 标题位于输入行下 24px，13px/18px、600。初始三行高各 46px：Ava Chen / Owner、Marco Rossi / Editor、Lena Park / Viewer。头像 32px 圆形，分别是 #e6dcd0 的 AC、#d8e3d8 的 MR、#e0d8e9 的 LP；名字 16px/500，角色 14px 靠右，头像与名字间距 12px。
- 底部距成员列表 16px，一行高 48px：Copy link 占可用宽度 44%，Send invite 占其余，间距 8px。前者浅填充，后者深底白字；无有效邮箱时发送按钮禁用，底色 #c7c3b9。所有按钮圆角 999px。
- 收起后为 200×56px 白色胶囊，左侧三个 34px 首字母头像以 -15px 间距叠放，2px 白边；右侧深色 Share 按钮为 99×44px。新增成员超过三人时显示 +N。场景下方 24px 处可有 9px 等宽字体的 open / close、细箭头与 {} 切换控件。

可操作状态
- 同一个分享标题按钮持续存在，展开时位于面板左上，收起时移动、缩小并变成右侧深色 Share 按钮；不能换成两个独立按钮交叉淡入。
- 关闭按钮、Escape、底部切换控件均可收起，再次点击 Share 展开。隐藏内容 inert，焦点移到可见按钮，aria-expanded 同步。
- 邮箱按 Enter、逗号、分号生成 34px 待邀请标签；标签包含 24px 首字母头像、最长 128px 的省略邮箱和移除按钮。支持批量粘贴，按空白、逗号、分号分割，统一小写，排除重复值和已有成员。格式错误显示 Enter a valid email address；全是重复值显示 This person already has access or is in your invite list。
- 角色弹层白底、116px 最小宽、16px 圆角，选项 Editor / Viewer；支持点击、方向键、Enter、Escape，关闭后返回触发按钮。
- Send invite 点击后禁用输入，文案变 Sending 并旋转线条加载图标；1050ms 后把待邀请成员加入本地列表，显示 Invite sent；1500ms 后恢复按钮。姓名从邮箱用户名分词并首字母大写，权限沿用标签创建时的选择。全程不发送邮件或真实权限请求。
- 发送成功时，待邀请标签的副本从当前实际坐标移动到新成员头像坐标，收缩为 32px 圆形，标签文字与移除按钮先淡出，随后姓名和权限出现。
- Copy link 使用 Clipboard API 写入当前页面地址并将 hash 设为 q4-plan；成功显示 Copied，失败显示 Try again，1800ms 后恢复。用 aria-live 宣告结果。

连续形变与动效
- 使用质量为 1 的阻尼弹簧：加速度 a=-k×(x-target)-c×v，可积分生成缓动曲线。展开宽度 k=306.25、c=28、时长 0.7s；展开高度 k=196、c=18.34、时长 0.86s、延迟 0.057s。收起高度 k=600.25、c=43.365、时长 0.62s；收起宽度 k=400、c=33、时长 0.64s、延迟 0.07s。
- 标题按钮展开时 left=8px、top=8px、宽为面板宽减 74px、高 48px；收起时 left=96px、top=5px、99×44px，背景 #20211d、白字，字体 14px。
- 内容在展开后 0.13s 开始从 y=10px、opacity=0、blur=3px 进入，时长 0.5s，逐组错开 0.035s；收起时内容 0.18s 淡出并模糊到 5px。标签到头像运动 0.6s，弹簧 k=300、c=24；新增成员以 0.2s 延迟、0.54s 时长进入。
- 新内容只重定向面板高度，不重播展开；快速反向、中断或改变减少动态效果偏好时终止旧动画，从当前值继续。hover 仅变颜色，不能抬升按钮或移动图标。
- locale 默认 en，可选择 zh；中文对应 分享"Q4 计划"、添加邮箱邀请、可编辑、仅查看、拥有访问权限的成员、复制链接、发送邀请。375px 下按容器宽度限制面板，长邮箱截断，成员过多内部滚动。

独立实现与六框架交付
- 仅凭本文从零生成可运行的实现。尺寸、颜色、文案、图形和运动算法均以上述文字为准；所有装饰用 CSS、内嵌 SVG 或 Canvas 绘制，不加载远程图片、字体、视频或素材。
- 当前交付重点为 React，组件名称 ShareInvite。从零创建四个文件：ShareInvite.tsx、ShareInviteEngine.js、motion-runtime.ts、ShareInviteEngine.d.ts；分别实现框架入口、完整交互核心、实例生命周期和类型声明。文件名是需要生成的产物，不假定接收者已经拥有任何文件。
- 同时提供 React、Vue、Svelte、Solid、Preact、Vanilla 原生生命周期入口，共享框架无关核心。DOM 仅在挂载后访问，支持同页多实例；更新时保持状态，销毁时清理动画、计时器、观察器及监听器。不要用 iframe 代替组件实现。
- 依赖安装说明：npm install react react-dom gsap@3.12.7。若使用依赖，只使用其公开API；组件的布局、样式、图形和算法必须在本次生成的文件中完整实现，不引用现成效果组件。
- 实现 options.height 以调整场景高度，options.reducedMotion 覆盖系统偏好；减少动态效果仍保留完整交互状态。options.locale 为 en 或 zh，默认 en。
- 给出每个文件的完整内容、安装和运行步骤、以下使用示例所需的全部实现。不得留省略号、待补素材或"自行补齐核心"的占位。
- 验收：375 / 768 / 1440px 无横向溢出；鼠标、键盘及相关触屏状态可用；成功、错误、快速中断、复制成功与失败均有反馈；多实例互不干扰，卸载后停止所有任务。

生成完成后的使用示例
import { ShareInvite } from "./ShareInvite";

export default function App() {
  return <ShareInvite />;
}
