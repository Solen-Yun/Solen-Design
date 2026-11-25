/* Component metadata only — the live demo and gallery preview live in
   prompt-bar-demo.jsx, the framework source texts and the prompt in
   prompt-bar-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with prompt-bar-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "placeholder", type: "string", default: '"Ask anything"', description: "输入框占位文字；听写中变为 Listening…" },
  { name: "sources", type: '{ key: string; name: string; description?: string; icon?: ReactNode; attach?: boolean }[]', default: "DEFAULT_SOURCES", description: "@ 唤出的来源列表；带 attach 的项会触发 onAttach 而不是插入文字" },
  { name: "commands", type: '{ key: string; name: string; description?: string }[]', default: "DEFAULT_COMMANDS", description: "/ 唤出的命令列表（名称形如 /summarize）" },
  { name: "models", type: '{ key: string; name: string; tag?: string }[]', default: "DEFAULT_MODELS", description: "模型选择列表；留空隐藏选择按钮" },
  { name: "defaultModel", type: "string", default: '""', description: "初始选中的模型 key" },
  { name: "efforts", type: "string[]", default: '["Low", "Medium", "High", "Extra", "Max"]', description: "算力档位列表；留空隐藏档位按钮与滑杆" },
  { name: "defaultEffort", type: "string", default: '""', description: "初始档位文案；缺省取列表中位" },
  { name: "onEffortChange", type: "(level: string) => void", default: "—", description: "档位变化时回调" },
  { name: "busy", type: "boolean", default: "false", description: "生成中：发送键变成停止键并禁用再次发送" },
  { name: "onSend", type: '(text: string, meta: { attachments: string[]; model; effort: string }) => void', default: "—", description: "发送时回调，带去除首尾空白的草稿、附件名、当前模型与档位" },
  { name: "onStop", type: "() => void", default: "—", description: "busy 状态下点击发送键时回调" },
  { name: "onAttach", type: "() => string | string[] | Promise<...>", default: "—", description: "选择带 attach 的来源时调用，解析出的文件名变成附件胶囊" },
  { name: "onDictate", type: "() => string | Promise<string>", default: "—", description: "解析出的听写文本会追加进草稿；提供此回调才显示麦克风按钮" },
  { name: "background", type: "string", default: '"#27272a"', description: "输入区背景色" },
  { name: "color", type: "string", default: '"#f5f5f5"', description: "文字主色" },
  { name: "menuBackground", type: "string", default: '"#323236"', description: "弹出菜单背景色" },
  { name: "sparkColor", type: "string", default: '"#b39dff"', description: "粒子火花与最高档位的强调色" },
  { name: "sparkBoost", type: "number", default: "1", description: "打字能量对粒子效果的增益倍数" },
  { name: "width", type: "number", default: "400", description: "输入条宽度（px），不超过容器" },
  { name: "radius", type: "number", default: "16", description: "输入区圆角（px）" },
  { name: "maxRows", type: "number", default: "5", description: "文本域最大行数，超出后滚动" },
  { name: "morphDuration", type: "number", default: "240", description: "发送键箭头↔方块形变时长（ms）" },
  { name: "squash", type: "number", default: "0.12", description: "形变中途的果冻挤压深度" },
  { name: "tilt", type: "number", default: "8", description: "形变时的最大倾斜角（度）" },
  { name: "pressScale", type: "number", default: "0.96", description: "发送键按下时的缩放" },
  { name: "className", type: "string", default: '""', description: "根元素附加类名" },
];

export default {
  id: "prompt-bar",
  name: "多源提示输入条",
  href: "prompt-bar.html",
  title: "多源提示输入条",
  description:
    "聊天式提示输入条：草稿尾部敲 @ 或 / 就地唤出来源与命令菜单（子串/前缀过滤、方向键高亮、Enter/Tab 采纳、Esc 关闭），工具栏提供模型选择与算力档位滑杆，附件变成可删除的胶囊；发送键的箭头会在发送/停止两种状态间果冻式形变，档位拉满时输入区泛起径向光晕、画布火花随打字能量升腾闪烁，麦克风按钮接听写回调把文本追加进草稿。motion 库驱动形变，Hugeicons 提供图形。",
  tags: ["React", "CSS", "motion", "表单"],

  cardDescription: "@ 唤来源、/ 唤命令的聊天输入条，档位拉满时火花升腾。",

  demoHint: "输入 @ 和 / 看两类菜单，拉满档位看火花与光晕，发送键随 busy 状态形变。",

  api: API,
};
