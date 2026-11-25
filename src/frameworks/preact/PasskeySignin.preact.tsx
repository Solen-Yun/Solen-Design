/** @jsxImportSource preact */
import { useEffect, useRef } from "preact/hooks";
import { mountPasskeySignin, type PasskeySigninOptions } from "../../components/passkey-signin/PasskeySigninEngine.js";
import type { MotionController } from "../../components/passkey-signin/motion-runtime";

export function PasskeySignin({ options, className }: { options?: PasskeySigninOptions; className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<MotionController | null>(null);
  useEffect(() => {
    const instance = mountPasskeySignin(host.current!, options);
    controller.current = instance;
    return () => { instance.destroy(); controller.current = null; };
    // Options are updated below without remounting the state machine.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { controller.current?.update(options ?? {}); }, [options]);
  return <div ref={host} className={className} data-motion-component="passkey-signin" />;
}
