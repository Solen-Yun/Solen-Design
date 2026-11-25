/** @jsxImportSource preact */
import { useEffect, useRef } from "preact/hooks";
import { mountHeroStaggerIntro, type HeroStaggerIntroOptions } from "../../components/hero-stagger-intro/HeroStaggerIntroEngine.js";
import type { MotionController } from "../../components/hero-stagger-intro/motion-runtime";

export function HeroStaggerIntro({ options, className }: { options?: HeroStaggerIntroOptions; className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<MotionController | null>(null);
  useEffect(() => {
    const instance = mountHeroStaggerIntro(host.current!, options);
    controller.current = instance;
    return () => { instance.destroy(); controller.current = null; };
    // Options are updated below without remounting the state machine.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { controller.current?.update(options ?? {}); }, [options]);
  return <div ref={host} className={className} data-motion-component="hero-stagger-intro" />;
}
