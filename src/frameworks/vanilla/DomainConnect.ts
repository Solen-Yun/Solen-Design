import { mountDomainConnect, type DomainConnectOptions } from "../../components/domain-connect/DomainConnectEngine.js";
import type { MotionController } from "../../components/domain-connect/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: DomainConnectOptions = {}): ReturnType<typeof mountDomainConnect> {
  return mountDomainConnect(target, options);
}
export type { DomainConnectOptions };
