/** @jsxImportSource preact */
import { useEffect, useRef } from "preact/hooks";
import { mountWordCube, type WordCubeOptions } from "../../components/word-cube/WordCubeEngine.js";
import type { MotionController } from "../../components/word-cube/motion-runtime";

export function WordCube({ options, className }: { options?: WordCubeOptions; className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<MotionController | null>(null);
  useEffect(() => {
    const instance = mountWordCube(host.current!, options);
    controller.current = instance;
    return () => { instance.destroy(); controller.current = null; };
    // Options are updated below without remounting the state machine.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { controller.current?.update(options ?? {}); }, [options]);
  return <div ref={host} className={className} data-motion-component="word-cube" />;
}
