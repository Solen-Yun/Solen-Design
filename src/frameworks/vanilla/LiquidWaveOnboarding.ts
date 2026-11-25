import { mountLiquidWaveOnboarding, type LiquidWaveOnboardingOptions } from "../../components/liquid-wave-onboarding/LiquidWaveOnboardingEngine.js";
import type { MotionController } from "../../components/liquid-wave-onboarding/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: LiquidWaveOnboardingOptions = {}): ReturnType<typeof mountLiquidWaveOnboarding> {
  return mountLiquidWaveOnboarding(target, options);
}
export type { LiquidWaveOnboardingOptions };
