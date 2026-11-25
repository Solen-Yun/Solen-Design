import { useState } from "react";
import { COMPONENTS } from "./registry.jsx";
import GooeyNav from "../src/components/gooey-nav/GooeyNav.jsx";

/* Shared template for every component page. Sections render only when the
   component has the data for them, so a component without (say) an install
   step simply doesn't show that section.

   One framework is selected for the whole page: 安装 / 依赖 / 代码 / 使用示例
   all follow it. */

export function Section({ title, action, children }) {
  return (
    <section>
      {action ? (
        <div className="section-head">
          <h2>{title}</h2>
          {action}
        </div>
      ) : (
        <h2>{title}</h2>
      )}
      {children}
    </section>
  );
}

export function Code({ children }) {
  return (
    <pre className="code">
      <code>{children}</code>
    </pre>
  );
}

export function CopyButton({ text, children, className = "" }) {
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      className={`copy-btn ${className}`.trim()}
      onClick={() => {
        navigator.clipboard?.writeText(text).then(() => {
          setDone(true);
          setTimeout(() => setDone(false), 1500);
        });
      }}
    >
      {children ?? (done ? "已复制" : "复制")}
      {children && done ? <span className="copy-done">已复制</span> : null}
    </button>
  );
}

/* Framework picker — drives 安装 / 依赖 / 代码 / 使用示例. */
export function FrameworkPicker({ frameworks, index, onChange }) {
  const [open, setOpen] = useState(false);
  const current = frameworks[index] ?? frameworks[0];

  return (
    <div className="file-code-picker">
      <button
        type="button"
        className="source-framework"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        {current.name}
        <Chevron />
      </button>
      {open ? (
        <ul className="file-code-menu">
          {frameworks.map((framework, i) => (
            <li key={framework.name}>
              <button
                type="button"
                onClick={() => {
                  onChange(i);
                  setOpen(false);
                }}
              >
                {framework.name}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

/* The source of one framework: a file picker plus the whole bundle. */
export function FileCode({ group, showBar = true }) {
  const [fileIndex, setFileIndex] = useState(0);
  const [open, setOpen] = useState(false);

  const file = group.files[fileIndex] ?? group.files[0];
  const bundle = group.files
    .map((item) => `// ── ${item.name} ──\n${item.code}`)
    .join("\n\n");

  return (
    <div className="source">
      {showBar ? (
        <div className="source-bar">
          <span className="source-label">{group.name}</span>
          <CopyButton text={bundle} className="source-copy">
            <CopyIcon />
            复制完整代码包
          </CopyButton>
        </div>
      ) : null}

      <div className="file-code">
        <div className="file-code-head">
          <div className="file-code-picker">
            <button
              type="button"
              className="file-code-pill"
              aria-expanded={open}
              onClick={() => setOpen((value) => !value)}
            >
              {file.name}
              <Chevron />
            </button>
            {open ? (
              <ul className="file-code-menu file-code-menu-right">
                {group.files.map((item, index) => (
                  <li key={item.name}>
                    <button
                      type="button"
                      onClick={() => {
                        setFileIndex(index);
                        setOpen(false);
                      }}
                    >
                      {item.name}
                    </button>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
          <CopyIconButton text={file.code} />
        </div>
        <div className="file-code-name">{file.name}</div>
        <pre className="code file-code-body">
          <code>{file.code}</code>
        </pre>
      </div>
    </div>
  );
}

/* Dependencies, with the command for each package manager. */
export function ManagerTabs({ commands }) {
  const managers = ["npm", "pnpm", "yarn", "bun"];
  const [active, setActive] = useState(managers[0]);

  return (
    <div className="file-code">
      <div className="file-code-head">
        <div className="manager-tabs">
          {managers.map((manager) => (
            <button
              key={manager}
              type="button"
              className={manager === active ? "active" : ""}
              onClick={() => setActive(manager)}
            >
              {manager}
            </button>
          ))}
        </div>
        <CopyIconButton text={commands[active]} />
      </div>
      <pre className="code file-code-body">
        <code>{commands[active]}</code>
      </pre>
    </div>
  );
}

/* A bare code block with a copy button in its corner. */
export function CopyableCode({ code }) {
  return (
    <div className="code-copy-wrap">
      <Code>{code}</Code>
      <CopyIconButton text={code} />
    </div>
  );
}

/* A single snippet, labelled with the file it belongs to. */
export function UsageBlock({ file, code }) {
  return (
    <div className="file-code">
      <div className="file-code-head">
        <span className="file-code-file">{file}</span>
        <CopyIconButton text={code} />
      </div>
      <pre className="code file-code-body">
        <code>{code}</code>
      </pre>
    </div>
  );
}

export function ApiTable({ rows }) {  return (
    <table className="api-table">
      <thead>
        <tr>
          <th>属性</th>
          <th>类型</th>
          <th>默认值</th>
          <th>说明</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.name}>
            <td>
              <code>{row.name}</code>
            </td>
            <td>
              <code>{row.type}</code>
            </td>
            <td>{row.default ? <code>{row.default}</code> : "—"}</td>
            <td>{row.description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/* A dropdown of copy actions. */
export function CopyMenu({ label, items }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="file-code-picker">
      <button
        type="button"
        className="copy-menu-button"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        {label}
        <Chevron />
      </button>
      {open ? (
        <ul className="file-code-menu copy-menu">
          {items.map((item) => (
            <li key={item.label}>
              <button
                type="button"
                onClick={() => {
                  item.onClick();
                  setOpen(false);
                }}
              >
                <span className="copy-menu-icon" aria-hidden="true">
                  {item.icon}
                </span>
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

/* The whole page as markdown — handy for pasting into an AI. */
function pageMarkdown({ title, description, tags, demoHint, framework, prompt, api }) {
  const ext = (name) => name.split(".").pop();
  const rows = (list) =>
    list
      .map(
        (row) =>
          `| ${row.name} | ${row.type} | ${row.default ?? "—"} | ${row.description} |`,
      )
      .join("\n");

  const parts = [
    `# ${title}`,
    description,
    tags?.length ? `标签：${tags.join(" · ")}` : "",
    demoHint ? `> ${demoHint}` : "",
    `## 安装\n\n\`\`\`bash\n${framework.install}\n\`\`\``,
    framework.dependencies
      ? `## 依赖\n\n${framework.dependencies.note}\n\n\`\`\`bash\n${framework.dependencies.npm}\n\`\`\``
      : "",
    `## 代码\n\n${framework.files
      .map((file) => `### ${file.name}\n\n\`\`\`${ext(file.name)}\n${file.code}\n\`\`\``)
      .join("\n\n")}`,
    `## 使用示例\n\n${framework.usage
      .map(
        (item) =>
          `\`\`\`${ext(item.file)}\n${item.code}\n\`\`\``,
      )
      .join("\n\n")}`,
    prompt ? `## 复刻提示词\n\n${prompt}` : "",
    api?.length
      ? `## API 参考\n\n| 属性 | 类型 | 默认值 | 说明 |\n| --- | --- | --- | --- |\n${rows(api)}`
      : "",
  ];

  return parts.filter(Boolean).join("\n\n");
}

export function ComponentPage({
  id,
  title,
  badge,
  description,
  tags,
  Demo,
  demoHint,
  frameworks,
  prompt,
  api,
}) {
  const [frameworkIndex, setFrameworkIndex] = useState(0);
  const [view, setView] = useState("preview"); /* preview | code */
  const framework = frameworks[frameworkIndex] ?? frameworks[0];

  /* 上一个 / 下一个按登记表顺序首尾相接。 */
  const at = COMPONENTS.findIndex((c) => c.id === id);
  const prev = COMPONENTS[(at - 1 + COMPONENTS.length) % COMPONENTS.length];
  const next = COMPONENTS[(at + 1) % COMPONENTS.length];

  const bundle = framework.files
    .map((file) => `// ── ${file.name} ──\n${file.code}`)
    .join("\n\n");

  const copy = (text) => () => {
    navigator.clipboard?.writeText(text);
  };

  return (
    <>
      <section className="page-head">
        <a className="back-link" href="./components.html">
          ← 全部组件
        </a>
        <h1>
          {title}
          {badge ? <span className="title-badge">{badge}</span> : null}
        </h1>
        {description ? <p>{description}</p> : null}
        {tags?.length ? (
          <ul className="tag-list">
            {tags.map((tag) => (
              <li className="tag" key={tag}>
                {tag}
              </li>
            ))}
          </ul>
        ) : null}
      </section>

      {Demo ? (
        <>
          <div className="page-toolbar">
            <GooeyNav
              items={[
                { label: "预览", icon: <EyeIcon /> },
                { label: "代码", icon: <CodeIcon /> },
              ]}
              activeIndex={view === "preview" ? 0 : 1}
              onChange={(index) => setView(index === 0 ? "preview" : "code")}
              theme="light"
              size="md"
              frame={true}
            />

            <CopyMenu
              label="复制给 AI"
              items={[
                { label: "复制提示词", icon: <SparkIcon />, onClick: copy(prompt || "") },
                { label: "复制完整代码包", icon: <CodeIcon />, onClick: copy(bundle) },
                {
                  label: "复制页面 Markdown",
                  icon: <DocIcon />,
                  onClick: copy(
                    pageMarkdown({
                      title,
                      description,
                      tags,
                      demoHint,
                      framework,
                      prompt,
                      api,
                    }),
                  ),
                },
              ]}
            />
          </div>

          {view === "preview" ? (
            <div className="page-panel">
              {demoHint ? <p className="demo-hint">{demoHint}</p> : null}
              <Demo />
            </div>
          ) : (
            <div className="page-panel code-view">
              <div className="code-view-block">
                <p className="code-view-label">安装</p>
                <div className="code-view-picker">
                  <FrameworkPicker
                    frameworks={frameworks}
                    index={frameworkIndex}
                    onChange={setFrameworkIndex}
                  />
                </div>
                <CopyableCode code={framework.install} />
              </div>

              {framework.dependencies ? (
                <div className="code-view-block">
                  <p className="code-view-label">依赖</p>
                  {framework.dependencies.note ? (
                    <p className="section-note">{framework.dependencies.note}</p>
                  ) : null}
                  <ManagerTabs commands={framework.dependencies} />
                </div>
              ) : null}

              <div className="code-view-block">
                <p className="code-view-label">代码</p>
                <div className="source-bar">
                  <FrameworkPicker
                    frameworks={frameworks}
                    index={frameworkIndex}
                    onChange={setFrameworkIndex}
                  />
                  <CopyButton text={bundle} className="source-copy">
                    <CopyIcon />
                    复制完整代码包
                  </CopyButton>
                </div>
                <FileCode group={framework} showBar={false} />
              </div>

              {framework.usage ? (
                <div className="code-view-block">
                  <p className="code-view-label">使用示例</p>
                  {(Array.isArray(framework.usage)
                    ? framework.usage
                    : [framework.usage]
                  ).map((item) => (
                    <UsageBlock key={item.file} file={item.file} code={item.code} />
                  ))}
                </div>
              ) : null}

              {prompt ? (
                <div className="code-view-block">
                  <p className="code-view-label">复刻提示词</p>
                  <div className="file-code prompt-code">
                    <div className="file-code-head">
                      <span className="file-code-file">SPEC.md</span>
                      <CopyIconButton text={prompt} />
                    </div>
                    <pre className="prompt-text">{prompt}</pre>
                  </div>
                </div>
              ) : null}
            </div>
          )}
        </>
      ) : null}

      {view === "preview" && api?.length ? (
        <Section title="API 参考">
          <p className="api-group">options</p>
          <ApiTable rows={api} />
          {framework.api?.length ? (
            <>
              <p className="api-group">组件属性 · {framework.name}</p>
              <ApiTable rows={framework.api} />
            </>
          ) : null}
        </Section>
      ) : null}

      <nav className="page-nav" aria-label="组件切换">
        <a className="page-nav-link" href={prev.href}>
          <span className="page-nav-label">← 上一个</span>
          <span className="page-nav-name">{prev.name}</span>
        </a>
        <a className="page-nav-link page-nav-next" href={next.href}>
          <span className="page-nav-label">下一个 →</span>
          <span className="page-nav-name">{next.name}</span>
        </a>
      </nav>
    </>
  );
}

function EyeIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true">
      <path
        d="M1.3 8S3.6 3.5 8 3.5 14.7 8 14.7 8 12.4 12.5 8 12.5 1.3 8 1.3 8Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <circle cx="8" cy="8" r="2.1" fill="none" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

function SparkIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" aria-hidden="true">
      <path
        d="M8 1.5 9.4 5.6 13.5 7 9.4 8.4 8 12.5 6.6 8.4 2.5 7 6.6 5.6 8 1.5Z"
        fill="currentColor"
      />
      <path
        d="M12.8 10.4 13.4 12.2 15.2 12.8 13.4 13.4 12.8 15.2 12.2 13.4 10.4 12.8 12.2 12.2 12.8 10.4Z"
        fill="currentColor"
      />
    </svg>
  );
}

function CodeIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" aria-hidden="true">
      <path
        d="M5.6 3.4 1 8l4.6 4.6M10.4 3.4 15 8l-4.6 4.6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DocIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" aria-hidden="true">
      <path
        d="M9 1.5H4.5A1.5 1.5 0 0 0 3 3v10a1.5 1.5 0 0 0 1.5 1.5h7A1.5 1.5 0 0 0 13 13V5.5L9 1.5Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path
        d="M9 1.5V5.5H13M5.5 8.5h5M5.5 11h3.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function Chevron() {
  return (
    <svg
      className="file-code-chevron"
      width="10"
      height="10"
      viewBox="0 0 10 10"
      aria-hidden="true"
    >
      <path
        d="M1.5 3.5 5 7 8.5 3.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" aria-hidden="true">
      <rect
        x="5.2"
        y="1.2"
        width="9.6"
        height="9.6"
        rx="2.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path
        d="M10.8 13.4H4.2a2 2 0 0 1-2-2V4.8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" aria-hidden="true">
      <path
        d="M3 8.5 6.5 12 13 4.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CopyIconButton({ text }) {
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      className="copy-icon"
      title={done ? "已复制" : "复制"}
      onClick={() => {
        navigator.clipboard?.writeText(text).then(() => {
          setDone(true);
          setTimeout(() => setDone(false), 1500);
        });
      }}
    >
      {done ? <CheckIcon /> : <CopyIcon />}
    </button>
  );
}
