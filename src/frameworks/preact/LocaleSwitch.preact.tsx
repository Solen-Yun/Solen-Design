/** @jsxImportSource preact */
import { useEffect, useRef } from "preact/hooks";
import { mountLocaleSwitch, type LocaleSwitchOptions } from "../../components/locale-switch/LocaleSwitchEngine.js";
import type { MotionController } from "../../components/locale-switch/motion-runtime";

export function LocaleSwitch({ options, className }: { options?: LocaleSwitchOptions; className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<MotionController | null>(null);
  useEffect(() => {
    const instance = mountLocaleSwitch(host.current!, options);
    controller.current = instance;
    return () => { instance.destroy(); controller.current = null; };
    // Options are updated below without remounting the state machine.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { controller.current?.update(options ?? {}); }, [options]);
  return <div ref={host} className={className} data-motion-component="locale-switch" />;
}
