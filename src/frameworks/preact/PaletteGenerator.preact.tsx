/** @jsxImportSource preact */
import { useEffect, useRef } from "preact/hooks";
import { mountPaletteGenerator, type PaletteGeneratorOptions } from "../../components/palette-generator/PaletteGeneratorEngine.js";
import type { MotionController } from "../../components/palette-generator/motion-runtime";

export function PaletteGenerator({ options, className }: { options?: PaletteGeneratorOptions; className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<MotionController | null>(null);
  useEffect(() => {
    const instance = mountPaletteGenerator(host.current!, options);
    controller.current = instance;
    return () => { instance.destroy(); controller.current = null; };
    // Options are updated below without remounting the state machine.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { controller.current?.update(options ?? {}); }, [options]);
  return <div ref={host} className={className} data-motion-component="palette-generator" />;
}
