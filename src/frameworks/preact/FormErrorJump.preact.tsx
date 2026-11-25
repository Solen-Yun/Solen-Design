/** @jsxImportSource preact */
import { useEffect, useRef } from "preact/hooks";
import { mountFormErrorJump, type FormErrorJumpOptions } from "../../components/form-error-jump/FormErrorJumpEngine.js";
import type { MotionController } from "../../components/form-error-jump/motion-runtime";

export function FormErrorJump({ options, className }: { options?: FormErrorJumpOptions; className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<MotionController | null>(null);
  useEffect(() => {
    const instance = mountFormErrorJump(host.current!, options);
    controller.current = instance;
    return () => { instance.destroy(); controller.current = null; };
    // Options are updated below without remounting the state machine.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { controller.current?.update(options ?? {}); }, [options]);
  return <div ref={host} className={className} data-motion-component="form-error-jump" />;
}
