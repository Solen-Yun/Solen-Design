import type { MotionOptions, MotionController } from "./motion-runtime";
export type ChordDiagramOptions = MotionOptions;
export function mountChordDiagram(target: HTMLElement, options?: ChordDiagramOptions): MotionController;
