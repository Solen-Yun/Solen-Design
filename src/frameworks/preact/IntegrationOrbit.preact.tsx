/** @jsxImportSource preact */
import { useEffect, useRef } from "preact/hooks";
import { mountIntegrationOrbit, type IntegrationOrbitOptions } from "../../components/integration-orbit/IntegrationOrbitEngine.js";
import type { MotionController } from "../../components/integration-orbit/motion-runtime";

export function IntegrationOrbit({ options, className }: { options?: IntegrationOrbitOptions; className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<MotionController | null>(null);
  useEffect(() => {
    const instance = mountIntegrationOrbit(host.current!, options);
    controller.current = instance;
    return () => { instance.destroy(); controller.current = null; };
    // Options are updated below without remounting the state machine.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { controller.current?.update(options ?? {}); }, [options]);
  return <div ref={host} className={className} data-motion-component="integration-orbit" />;
}
