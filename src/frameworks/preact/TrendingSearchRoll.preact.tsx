/** @jsxImportSource preact */
import { useEffect, useRef } from "preact/hooks";
import { mountTrendingSearchRoll, type TrendingSearchRollOptions } from "../../components/trending-search-roll/TrendingSearchRollEngine.js";
import type { MotionController } from "../../components/trending-search-roll/motion-runtime";

export function TrendingSearchRoll({ options, className }: { options?: TrendingSearchRollOptions; className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<MotionController | null>(null);
  useEffect(() => {
    const instance = mountTrendingSearchRoll(host.current!, options);
    controller.current = instance;
    return () => { instance.destroy(); controller.current = null; };
    // Options are updated below without remounting the state machine.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { controller.current?.update(options ?? {}); }, [options]);
  return <div ref={host} className={className} data-motion-component="trending-search-roll" />;
}
