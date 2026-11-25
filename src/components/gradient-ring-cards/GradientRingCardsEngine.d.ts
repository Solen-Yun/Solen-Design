import type { MotionOptions, MotionController } from "./motion-runtime";
export type GradientRingCardsOptions = MotionOptions & { active?: number; autoRotate?: boolean; speed?: number; distortion?: number; onSelect?: (id: string) => void };
export function mountGradientRingCards(target: HTMLElement, options?: GradientRingCardsOptions): Omit<MotionController, "update"> & { update(options: GradientRingCardsOptions): void };
