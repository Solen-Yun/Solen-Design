/** @jsxImportSource preact */
import { useEffect, useRef } from "preact/hooks";
import { mountGalaxyEffortSlider, type GalaxyEffortSliderOptions } from "../../components/galaxy-effort-slider/GalaxyEffortSliderEngine.js";
import type { MotionController } from "../../components/galaxy-effort-slider/motion-runtime";

export function GalaxyEffortSlider({ options, className }: { options?: GalaxyEffortSliderOptions; className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<MotionController | null>(null);
  useEffect(() => {
    const instance = mountGalaxyEffortSlider(host.current!, options);
    controller.current = instance;
    return () => { instance.destroy(); controller.current = null; };
    // Options are updated below without remounting the state machine.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { controller.current?.update(options ?? {}); }, [options]);
  return <div ref={host} className={className} data-motion-component="galaxy-effort-slider" />;
}
