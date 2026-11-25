/** @jsxImportSource preact */
import { useEffect, useRef } from "preact/hooks";
import { mountInstallCommandTabs, type InstallCommandTabsOptions } from "../../components/install-command-tabs/InstallCommandTabsEngine.js";
import type { MotionController } from "../../components/install-command-tabs/motion-runtime";

export function InstallCommandTabs({ options, className }: { options?: InstallCommandTabsOptions; className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<MotionController | null>(null);
  useEffect(() => {
    const instance = mountInstallCommandTabs(host.current!, options);
    controller.current = instance;
    return () => { instance.destroy(); controller.current = null; };
    // Options are updated below without remounting the state machine.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { controller.current?.update(options ?? {}); }, [options]);
  return <div ref={host} className={className} data-motion-component="install-command-tabs" />;
}
