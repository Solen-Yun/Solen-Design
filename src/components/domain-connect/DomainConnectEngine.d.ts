import type { MotionOptions, MotionController } from "./motion-runtime";
export type DomainConnectOptions = MotionOptions;
export function mountDomainConnect(target: HTMLElement, options?: DomainConnectOptions): MotionController;
