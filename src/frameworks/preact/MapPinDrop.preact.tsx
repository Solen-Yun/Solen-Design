/** @jsxImportSource preact */
import { useEffect, useRef } from "preact/hooks";
import { mountMapPinDrop, type MapPinDropOptions } from "../../components/map-pin-drop/MapPinDropEngine.js";
import type { MotionController } from "../../components/map-pin-drop/motion-runtime";

export function MapPinDrop({ options, className }: { options?: MapPinDropOptions; className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<MotionController | null>(null);
  useEffect(() => {
    const instance = mountMapPinDrop(host.current!, options);
    controller.current = instance;
    return () => { instance.destroy(); controller.current = null; };
    // Options are updated below without remounting the state machine.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { controller.current?.update(options ?? {}); }, [options]);
  return <div ref={host} className={className} data-motion-component="map-pin-drop" />;
}
