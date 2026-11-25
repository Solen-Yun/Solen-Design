/** @jsxImportSource preact */
import { useEffect, useRef } from "preact/hooks";
import { mountProductHotspots, type ProductHotspotsOptions } from "../../components/product-hotspots/ProductHotspotsEngine.js";
import type { MotionController } from "../../components/product-hotspots/motion-runtime";

export function ProductHotspots({ options, className }: { options?: ProductHotspotsOptions; className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<MotionController | null>(null);
  useEffect(() => {
    const instance = mountProductHotspots(host.current!, options);
    controller.current = instance;
    return () => { instance.destroy(); controller.current = null; };
    // Options are updated below without remounting the state machine.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { controller.current?.update(options ?? {}); }, [options]);
  return <div ref={host} className={className} data-motion-component="product-hotspots" />;
}
