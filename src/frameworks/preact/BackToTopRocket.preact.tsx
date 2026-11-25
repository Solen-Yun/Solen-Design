/** @jsxImportSource preact */
import { useEffect, useRef } from "preact/hooks";
import { mountBackToTopRocket, type BackToTopRocketOptions } from "../../components/back-to-top-rocket/BackToTopRocketEngine.js";
import type { MotionController } from "../../components/back-to-top-rocket/motion-runtime";

export function BackToTopRocket({ options, className }: { options?: BackToTopRocketOptions; className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<MotionController | null>(null);
  useEffect(() => {
    const instance = mountBackToTopRocket(host.current!, options);
    controller.current = instance;
    return () => { instance.destroy(); controller.current = null; };
    // Options are updated below without remounting the state machine.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { controller.current?.update(options ?? {}); }, [options]);
  return <div ref={host} className={className} data-motion-component="back-to-top-rocket" />;
}
