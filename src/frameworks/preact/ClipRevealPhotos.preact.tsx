/** @jsxImportSource preact */
import { useEffect, useRef } from "preact/hooks";
import { mountClipRevealPhotos, type ClipRevealPhotosOptions } from "../../components/clip-reveal-photos/ClipRevealPhotosEngine.js";
import type { MotionController } from "../../components/clip-reveal-photos/motion-runtime";

export function ClipRevealPhotos({ options, className }: { options?: ClipRevealPhotosOptions; className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<MotionController | null>(null);
  useEffect(() => {
    const instance = mountClipRevealPhotos(host.current!, options);
    controller.current = instance;
    return () => { instance.destroy(); controller.current = null; };
    // Options are updated below without remounting the state machine.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { controller.current?.update(options ?? {}); }, [options]);
  return <div ref={host} className={className} data-motion-component="clip-reveal-photos" />;
}
