/** @jsxImportSource preact */
import { useEffect, useRef } from "preact/hooks";
import { mountXrayCodeLens, type XrayCodeLensOptions } from "../../components/xray-code-lens/XrayCodeLensEngine.js";
import type { MotionController } from "../../components/xray-code-lens/motion-runtime";

export function XrayCodeLens({ options, className }: { options?: XrayCodeLensOptions; className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<MotionController | null>(null);
  useEffect(() => {
    const instance = mountXrayCodeLens(host.current!, options);
    controller.current = instance;
    return () => { instance.destroy(); controller.current = null; };
    // Options are updated below without remounting the state machine.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { controller.current?.update(options ?? {}); }, [options]);
  return <div ref={host} className={className} data-motion-component="xray-code-lens" />;
}
