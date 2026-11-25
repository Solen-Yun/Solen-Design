import { mountChordDiagram, type ChordDiagramOptions } from "../../components/chord-diagram/ChordDiagramEngine.js";
import type { MotionController } from "../../components/chord-diagram/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: ChordDiagramOptions = {}): ReturnType<typeof mountChordDiagram> {
  return mountChordDiagram(target, options);
}
export type { ChordDiagramOptions };
