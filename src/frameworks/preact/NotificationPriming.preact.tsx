/** @jsxImportSource preact */
import { useEffect, useRef } from "preact/hooks";
import { mountNotificationPriming, type NotificationPrimingOptions } from "../../components/notification-priming/NotificationPrimingEngine.js";
import type { MotionController } from "../../components/notification-priming/motion-runtime";

export function NotificationPriming({ options, className }: { options?: NotificationPrimingOptions; className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<MotionController | null>(null);
  useEffect(() => {
    const instance = mountNotificationPriming(host.current!, options);
    controller.current = instance;
    return () => { instance.destroy(); controller.current = null; };
    // Options are updated below without remounting the state machine.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { controller.current?.update(options ?? {}); }, [options]);
  return <div ref={host} className={className} data-motion-component="notification-priming" />;
}
