/** @jsxImportSource preact */
import { useEffect, useRef } from "preact/hooks";
import { mountLinkShortener, type LinkShortenerOptions } from "../../components/link-shortener/LinkShortenerEngine.js";
import type { MotionController } from "../../components/link-shortener/motion-runtime";

export function LinkShortener({ options, className }: { options?: LinkShortenerOptions; className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<MotionController | null>(null);
  useEffect(() => {
    const instance = mountLinkShortener(host.current!, options);
    controller.current = instance;
    return () => { instance.destroy(); controller.current = null; };
    // Options are updated below without remounting the state machine.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { controller.current?.update(options ?? {}); }, [options]);
  return <div ref={host} className={className} data-motion-component="link-shortener" />;
}
