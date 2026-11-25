import { mountIntegrationOrbit, type IntegrationOrbitOptions } from "../../components/integration-orbit/IntegrationOrbitEngine.js";
import type { MotionController } from "../../components/integration-orbit/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: IntegrationOrbitOptions = {}): ReturnType<typeof mountIntegrationOrbit> {
  return mountIntegrationOrbit(target, options);
}
export type { IntegrationOrbitOptions };
