/** @jsxImportSource preact */
import { useEffect, useRef } from "preact/hooks";
import { mountTactilePushButton, type TactilePushButtonOptions } from "../../components/tactile-push-button/TactilePushButtonEngine.js";
import type { MotionController } from "../../components/tactile-push-button/motion-runtime";

export function TactilePushButton({ options, className }: { options?: TactilePushButtonOptions; className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<MotionController | null>(null);
  useEffect(() => {
    const instance = mountTactilePushButton(host.current!, options);
    controller.current = instance;
    return () => { instance.destroy(); controller.current = null; };
    // Options are updated below without remounting the state machine.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { controller.current?.update(options ?? {}); }, [options]);
  return <div ref={host} className={className} data-motion-component="tactile-push-button" />;
}
