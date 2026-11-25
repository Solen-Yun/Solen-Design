"use client";
import { useEffect, useRef } from "react";
import { mountParticleNetwork, type ParticleNetworkOptions } from "./ParticleNetworkEngine.js";
import type { MotionController } from "./motion-runtime";

export function ParticleNetwork({ options, className }: { options?: ParticleNetworkOptions; className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<MotionController | null>(null);
  useEffect(() => {
    const instance = mountParticleNetwork(host.current!, options);
    controller.current = instance;
    return () => { instance.destroy(); controller.current = null; };
    // Options are updated below without remounting the state machine.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { controller.current?.update(options ?? {}); }, [options]);
  return <div ref={host} className={className} data-motion-component="particle-network" />;
}
