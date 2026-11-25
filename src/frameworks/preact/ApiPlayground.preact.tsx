/** @jsxImportSource preact */
import { useEffect, useRef } from "preact/hooks";
import { mountApiPlayground, type ApiPlaygroundOptions } from "../../components/api-playground/ApiPlaygroundEngine.js";
import type { MotionController } from "../../components/api-playground/motion-runtime";

export function ApiPlayground({ options, className }: { options?: ApiPlaygroundOptions; className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<MotionController | null>(null);
  useEffect(() => {
    const instance = mountApiPlayground(host.current!, options);
    controller.current = instance;
    return () => { instance.destroy(); controller.current = null; };
    // Options are updated below without remounting the state machine.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { controller.current?.update(options ?? {}); }, [options]);
  return <div ref={host} className={className} data-motion-component="api-playground" />;
}
