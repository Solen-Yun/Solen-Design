/** @jsxImportSource preact */
import { useEffect, useRef } from "preact/hooks";
import { mountTeamInvite, type TeamInviteOptions } from "../../components/team-invite/TeamInviteEngine.js";
import type { MotionController } from "../../components/team-invite/motion-runtime";

export function TeamInvite({ options, className }: { options?: TeamInviteOptions; className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<MotionController | null>(null);
  useEffect(() => {
    const instance = mountTeamInvite(host.current!, options);
    controller.current = instance;
    return () => { instance.destroy(); controller.current = null; };
    // Options are updated below without remounting the state machine.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { controller.current?.update(options ?? {}); }, [options]);
  return <div ref={host} className={className} data-motion-component="team-invite" />;
}
