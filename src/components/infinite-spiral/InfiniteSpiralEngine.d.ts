import type { MotionOptions, MotionController } from "./motion-runtime";

export type InfiniteSpiralItem = {
  src: string;
  alt?: string;
  href?: string;
  target?: string;
  label?: string;
  id?: string;
};

export type InfiniteSpiralOptions = MotionOptions & {
  items?: (string | InfiniteSpiralItem)[];
  speed?: number;
  direction?: "up" | "down";
  animationMode?: "auto" | "drag" | "scroll" | "all";
  radius?: number;
  cardWidth?: number;
  cardHeight?: number;
  verticalSpacing?: number;
  perspective?: number;
  cardsPerTurn?: number;
  rotation?: number;
  cardTilt?: number;
  cardRadius?: number;
  centerScale?: number;
  edgeFade?: number;
  edgeBlur?: number;
  pauseOnHover?: boolean;
  imageFit?: "cover" | "contain";
  grayscale?: number;
};

export function mountInfiniteSpiral(
  target: HTMLElement,
  options?: InfiniteSpiralOptions,
): Omit<MotionController, "update"> & { update(options: InfiniteSpiralOptions): void };
