import { mountGlowBorderCta, type GlowBorderCtaOptions } from "../../components/glow-border-cta/GlowBorderCtaEngine.js";
import type { MotionController } from "../../components/glow-border-cta/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: GlowBorderCtaOptions = {}): ReturnType<typeof mountGlowBorderCta> {
  return mountGlowBorderCta(target, options);
}
export type { GlowBorderCtaOptions };
