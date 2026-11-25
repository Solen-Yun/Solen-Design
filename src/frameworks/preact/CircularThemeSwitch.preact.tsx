/** @jsxImportSource preact */
import { useEffect, useRef } from "preact/hooks";
import { mountCircularThemeSwitch, type CircularThemeSwitchOptions } from "../../components/circular-theme-switch/CircularThemeSwitchEngine.js";
import type { MotionController } from "../../components/circular-theme-switch/motion-runtime";

export function CircularThemeSwitch({ options, className }: { options?: CircularThemeSwitchOptions; className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<MotionController | null>(null);
  useEffect(() => {
    const instance = mountCircularThemeSwitch(host.current!, options);
    controller.current = instance;
    return () => { instance.destroy(); controller.current = null; };
    // Options are updated below without remounting the state machine.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { controller.current?.update(options ?? {}); }, [options]);
  return <div ref={host} className={className} data-motion-component="circular-theme-switch" />;
}
