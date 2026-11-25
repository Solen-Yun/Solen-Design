/** @jsxImportSource preact */
import { useEffect, useRef } from "preact/hooks";
import { mountSailingToc, type SailingTocOptions } from "../../components/sailing-toc/SailingTocEngine.js";
import type { MotionController } from "../../components/sailing-toc/motion-runtime";

export function SailingToc({ options, className }: { options?: SailingTocOptions; className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<MotionController | null>(null);
  useEffect(() => {
    const instance = mountSailingToc(host.current!, options);
    controller.current = instance;
    return () => { instance.destroy(); controller.current = null; };
    // Options are updated below without remounting the state machine.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { controller.current?.update(options ?? {}); }, [options]);
  return <div ref={host} className={className} data-motion-component="sailing-toc" />;
}
