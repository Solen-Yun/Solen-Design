/** @jsxImportSource preact */
import { useEffect, useRef } from "preact/hooks";
import { mountSitePreloader, type SitePreloaderOptions } from "../../components/site-preloader/SitePreloaderEngine.js";
import type { MotionController } from "../../components/site-preloader/motion-runtime";

export function SitePreloader({ options, className }: { options?: SitePreloaderOptions; className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<MotionController | null>(null);
  useEffect(() => {
    const instance = mountSitePreloader(host.current!, options);
    controller.current = instance;
    return () => { instance.destroy(); controller.current = null; };
    // Options are updated below without remounting the state machine.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { controller.current?.update(options ?? {}); }, [options]);
  return <div ref={host} className={className} data-motion-component="site-preloader" />;
}
