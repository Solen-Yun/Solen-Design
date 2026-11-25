/** @jsxImportSource preact */
import { useEffect, useRef } from "preact/hooks";
import { mountParticleTextureTrio, type ParticleTextureTrioOptions } from "../../components/particle-texture-trio/ParticleTextureTrioEngine.js";
import type { MotionController } from "../../components/particle-texture-trio/motion-runtime";

export function ParticleTextureTrio({ options, className }: { options?: ParticleTextureTrioOptions; className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<MotionController | null>(null);
  useEffect(() => {
    const instance = mountParticleTextureTrio(host.current!, options);
    controller.current = instance;
    return () => { instance.destroy(); controller.current = null; };
    // Options are updated below without remounting the state machine.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { controller.current?.update(options ?? {}); }, [options]);
  return <div ref={host} className={className} data-motion-component="particle-texture-trio" />;
}
