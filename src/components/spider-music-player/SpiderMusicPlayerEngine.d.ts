import type { MotionOptions, MotionController } from "./motion-runtime";
export type SpiderMusicPlayerOptions = MotionOptions & { track?: number; playing?: boolean; onTrackChange?: (index: number) => void };
export function mountSpiderMusicPlayer(target: HTMLElement, options?: SpiderMusicPlayerOptions): Omit<MotionController, "update"> & { update(options: SpiderMusicPlayerOptions): void };
