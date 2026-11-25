/** @jsxImportSource preact */
import { useEffect, useRef } from "preact/hooks";
import { mountCategoryChipScrollspy, type CategoryChipScrollspyOptions } from "../../components/category-chip-scrollspy/CategoryChipScrollspyEngine.js";
import type { MotionController } from "../../components/category-chip-scrollspy/motion-runtime";

export function CategoryChipScrollspy({ options, className }: { options?: CategoryChipScrollspyOptions; className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<MotionController | null>(null);
  useEffect(() => {
    const instance = mountCategoryChipScrollspy(host.current!, options);
    controller.current = instance;
    return () => { instance.destroy(); controller.current = null; };
    // Options are updated below without remounting the state machine.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { controller.current?.update(options ?? {}); }, [options]);
  return <div ref={host} className={className} data-motion-component="category-chip-scrollspy" />;
}
