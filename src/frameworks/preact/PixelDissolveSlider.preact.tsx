/** @jsxImportSource preact */
import { useEffect, useRef } from "preact/hooks";
import { mountPixelDissolveSlider, type PixelDissolveSliderOptions } from "../../components/pixel-dissolve-slider/PixelDissolveSliderEngine.js";
import type { MotionController } from "../../components/pixel-dissolve-slider/motion-runtime";

export function PixelDissolveSlider({ options, className }: { options?: PixelDissolveSliderOptions; className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<MotionController | null>(null);
  useEffect(() => {
    const instance = mountPixelDissolveSlider(host.current!, options);
    controller.current = instance;
    return () => { instance.destroy(); controller.current = null; };
    // Options are updated below without remounting the state machine.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { controller.current?.update(options ?? {}); }, [options]);
  return <div ref={host} className={className} data-motion-component="pixel-dissolve-slider" />;
}
