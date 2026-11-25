/** @jsxImportSource preact */
import { useEffect, useRef } from "preact/hooks";
import { mountMapClusters, type MapClustersOptions } from "../../components/map-clusters/MapClustersEngine.js";
import type { MotionController } from "../../components/map-clusters/motion-runtime";

export function MapClusters({ options, className }: { options?: MapClustersOptions; className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<MotionController | null>(null);
  useEffect(() => {
    const instance = mountMapClusters(host.current!, options);
    controller.current = instance;
    return () => { instance.destroy(); controller.current = null; };
    // Options are updated below without remounting the state machine.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { controller.current?.update(options ?? {}); }, [options]);
  return <div ref={host} className={className} data-motion-component="map-clusters" />;
}
