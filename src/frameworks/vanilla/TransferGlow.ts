import { mountTransferGlow, type TransferGlowOptions } from "../../components/transfer-glow/TransferGlowEngine.js";
import type { MotionController } from "../../components/transfer-glow/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: TransferGlowOptions = {}): ReturnType<typeof mountTransferGlow> {
  return mountTransferGlow(target, options);
}
export type { TransferGlowOptions };
