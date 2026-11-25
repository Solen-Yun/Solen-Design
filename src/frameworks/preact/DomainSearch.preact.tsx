/** @jsxImportSource preact */
import { useEffect, useRef } from "preact/hooks";
import { mountDomainSearch, type DomainSearchOptions } from "../../components/domain-search/DomainSearchEngine.js";
import type { MotionController } from "../../components/domain-search/motion-runtime";

export function DomainSearch({ options, className }: { options?: DomainSearchOptions; className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<MotionController | null>(null);
  useEffect(() => {
    const instance = mountDomainSearch(host.current!, options);
    controller.current = instance;
    return () => { instance.destroy(); controller.current = null; };
    // Options are updated below without remounting the state machine.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { controller.current?.update(options ?? {}); }, [options]);
  return <div ref={host} className={className} data-motion-component="domain-search" />;
}
