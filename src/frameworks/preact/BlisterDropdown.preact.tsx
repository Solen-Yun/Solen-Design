/** @jsxImportSource preact */
import { useEffect, useRef } from "preact/hooks";
import { mountBlisterDropdown, type BlisterDropdownOptions } from "../../components/blister-dropdown/BlisterDropdownEngine.js";
import type { MotionController } from "../../components/blister-dropdown/motion-runtime";

export function BlisterDropdown({ options, className }: { options?: BlisterDropdownOptions; className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<MotionController | null>(null);
  useEffect(() => {
    const instance = mountBlisterDropdown(host.current!, options);
    controller.current = instance;
    return () => { instance.destroy(); controller.current = null; };
    // Options are updated below without remounting the state machine.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { controller.current?.update(options ?? {}); }, [options]);
  return <div ref={host} className={className} data-motion-component="blister-dropdown" />;
}
