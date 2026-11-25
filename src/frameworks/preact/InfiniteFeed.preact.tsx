/** @jsxImportSource preact */
import { useEffect, useRef } from "preact/hooks";
import { mountInfiniteFeed, type InfiniteFeedOptions } from "../../components/infinite-feed/InfiniteFeedEngine.js";
import type { MotionController } from "../../components/infinite-feed/motion-runtime";

export function InfiniteFeed({ options, className }: { options?: InfiniteFeedOptions; className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<MotionController | null>(null);
  useEffect(() => {
    const instance = mountInfiniteFeed(host.current!, options);
    controller.current = instance;
    return () => { instance.destroy(); controller.current = null; };
    // Options are updated below without remounting the state machine.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { controller.current?.update(options ?? {}); }, [options]);
  return <div ref={host} className={className} data-motion-component="infinite-feed" />;
}
