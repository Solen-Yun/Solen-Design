import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { TransferGlow } from "../../src/components/transfer-glow/TransferGlow.tsx";

/* The demo plus a live customize panel — every control is a real option. */

/* The option defaults mirror the engine defaults. */
const DEFAULTS = {
  open: true,
  amount: "100,000.00",
  account: "Grain USD account",
  recipient: "Müller Logistik GmbH",
  receivedAmount: "€92,000.00",
  duration: 5200,
};

function Switch({ checked, onChange, label }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      className={checked ? "switch on" : "switch"}
      onClick={() => onChange(!checked)}
    >
      <span className="switch-knob" />
    </button>
  );
}

function ControlRow({ label, children }) {
  return (
    <div className="control">
      <span className="control-label">{label}</span>
      {children}
    </div>
  );
}

function TextField({ label, value, onChange }) {
  return (
    <ControlRow label={label}>
      <input
        type="text"
        className="control-input"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-label={label}
      />
    </ControlRow>
  );
}

function Slider({ label, value, min, max, step, format, onChange }) {
  return (
    <ControlRow label={label}>
      <output className="control-value">{format(value)}</output>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        aria-label={label}
      />
    </ControlRow>
  );
}

function Demo() {
  const [opts, setOpts] = useState(DEFAULTS);
  const [reducedMotion, setReducedMotion] = useState(false);
  const set = (patch) => setOpts((prev) => ({ ...prev, ...patch }));
  const reset = () => {
    setOpts(DEFAULTS);
    setReducedMotion(false);
  };

  return (
    <>
      <div className="demo-stage" style={{ background: "#ffffff", colorScheme: "light" }}>
        <DemoFit>

          <TransferGlow options={{ ...opts, reducedMotion, onOpenChange: (open) => set({ open }) }} />
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./transfer-glow-preview.html">
          <span aria-hidden="true">⧉</span> 打开完整预览
        </a>
      </div>

      <div className="customize">
        <div className="customize-head">
          <p className="customize-title">自定义</p>
          <button type="button" className="customize-reset" onClick={reset}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
              <path d="M3 3v5h5" />
            </svg>
            Reset
          </button>
        </div>
        <div className="customize-grid">
          <TextField label="转账金额" value={opts.amount} onChange={(amount) => set({ amount })} />
          <TextField label="转出账户" value={opts.account} onChange={(account) => set({ account })} />
          <TextField label="收款方" value={opts.recipient} onChange={(recipient) => set({ recipient })} />
          <TextField label="到账金额" value={opts.receivedAmount} onChange={(receivedAmount) => set({ receivedAmount })} />
          <Slider label="处理时长" value={opts.duration} min={1200} max={15000} step={100} format={(v) => `${(v / 1000).toFixed(1)}s`} onChange={(duration) => set({ duration })} />
          <ControlRow label="弹出弹窗">
            <Switch checked={opts.open} onChange={(open) => set({ open })} label="弹出弹窗" />
          </ControlRow>
          <ControlRow label="减少动态">
            <Switch checked={reducedMotion} onChange={setReducedMotion} label="减少动态" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — the full flow still works inside the card. The scene is
   840px tall by default and centers the modal, so the card crop
   (aspect-ratio 720/540, top-aligned) needs a shorter height to keep the
   modal inside the visible area. */
function CardPreview() {
  return (
    <div className="comp-zoom">
      <TransferGlow options={{ reducedMotion: true, height: 480 }} />
    </div>
  );
}


export { Demo, CardPreview };
