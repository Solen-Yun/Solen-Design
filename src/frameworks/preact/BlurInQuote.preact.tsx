/** @jsxImportSource preact */
import { useEffect, useRef } from "preact/hooks";
import { mountBlurInQuote, type BlurInQuoteOptions } from "../../components/blur-in-quote/BlurInQuoteEngine.js";
import type { MotionController } from "../../components/blur-in-quote/motion-runtime";

export function BlurInQuote({ options, className }: { options?: BlurInQuoteOptions; className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<MotionController | null>(null);
  useEffect(() => {
    const instance = mountBlurInQuote(host.current!, options);
    controller.current = instance;
    return () => { instance.destroy(); controller.current = null; };
    // Options are updated below without remounting the state machine.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { controller.current?.update(options ?? {}); }, [options]);
  return <div ref={host} className={className} data-motion-component="blur-in-quote" />;
}
