/** @jsxImportSource preact */
import { useEffect, useRef } from "preact/hooks";
import { mountProductLoupe, type ProductLoupeOptions } from "../../components/product-loupe/ProductLoupeEngine.js";
import type { MotionController } from "../../components/product-loupe/motion-runtime";

export function ProductLoupe({ options, className }: { options?: ProductLoupeOptions; className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<MotionController | null>(null);
  useEffect(() => {
    const instance = mountProductLoupe(host.current!, options);
    controller.current = instance;
    return () => { instance.destroy(); controller.current = null; };
    // Options are updated below without remounting the state machine.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { controller.current?.update(options ?? {}); }, [options]);
  return <div ref={host} className={className} data-motion-component="product-loupe" />;
}
