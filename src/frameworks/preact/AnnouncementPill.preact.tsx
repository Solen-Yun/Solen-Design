/** @jsxImportSource preact */
import { useEffect, useRef } from "preact/hooks";
import { mountAnnouncementPill, type AnnouncementPillOptions } from "../../components/announcement-pill/AnnouncementPillEngine.js";
import type { MotionController } from "../../components/announcement-pill/motion-runtime";

export function AnnouncementPill({ options, className }: { options?: AnnouncementPillOptions; className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<MotionController | null>(null);
  useEffect(() => {
    const instance = mountAnnouncementPill(host.current!, options);
    controller.current = instance;
    return () => { instance.destroy(); controller.current = null; };
    // Options are updated below without remounting the state machine.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { controller.current?.update(options ?? {}); }, [options]);
  return <div ref={host} className={className} data-motion-component="announcement-pill" />;
}
