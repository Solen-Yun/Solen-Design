/** @jsxImportSource preact */
import { useEffect, useRef } from "preact/hooks";
import { mountScrollDrawRoute, type ScrollDrawRouteOptions } from "../../components/scroll-draw-route/ScrollDrawRouteEngine.js";
import type { MotionController } from "../../components/scroll-draw-route/motion-runtime";

export function ScrollDrawRoute({ options, className }: { options?: ScrollDrawRouteOptions; className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<MotionController | null>(null);
  useEffect(() => {
    const instance = mountScrollDrawRoute(host.current!, options);
    controller.current = instance;
    return () => { instance.destroy(); controller.current = null; };
    // Options are updated below without remounting the state machine.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { controller.current?.update(options ?? {}); }, [options]);
  return <div ref={host} className={className} data-motion-component="scroll-draw-route" />;
}
