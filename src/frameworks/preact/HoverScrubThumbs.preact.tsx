/** @jsxImportSource preact */
import { useEffect, useRef } from "preact/hooks";
import { mountHoverScrubThumbs, type HoverScrubThumbsOptions } from "../../components/hover-scrub-thumbs/HoverScrubThumbsEngine.js";
import type { MotionController } from "../../components/hover-scrub-thumbs/motion-runtime";

export function HoverScrubThumbs({ options, className }: { options?: HoverScrubThumbsOptions; className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<MotionController | null>(null);
  useEffect(() => {
    const instance = mountHoverScrubThumbs(host.current!, options);
    controller.current = instance;
    return () => { instance.destroy(); controller.current = null; };
    // Options are updated below without remounting the state machine.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { controller.current?.update(options ?? {}); }, [options]);
  return <div ref={host} className={className} data-motion-component="hover-scrub-thumbs" />;
}
