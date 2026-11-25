/** @jsxImportSource preact */
import { useEffect, useRef } from "preact/hooks";
import { mountShareDialog, type ShareDialogOptions } from "../../components/share-dialog/ShareDialogEngine.js";
import type { MotionController } from "../../components/share-dialog/motion-runtime";

export function ShareDialog({ options, className }: { options?: ShareDialogOptions; className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<MotionController | null>(null);
  useEffect(() => {
    const instance = mountShareDialog(host.current!, options);
    controller.current = instance;
    return () => { instance.destroy(); controller.current = null; };
    // Options are updated below without remounting the state machine.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { controller.current?.update(options ?? {}); }, [options]);
  return <div ref={host} className={className} data-motion-component="share-dialog" />;
}
