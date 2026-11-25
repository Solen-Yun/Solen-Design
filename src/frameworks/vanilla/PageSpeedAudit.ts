import { mountPageSpeedAudit, type PageSpeedAuditOptions } from "../../components/page-speed-audit/PageSpeedAuditEngine.js";
import type { MotionController } from "../../components/page-speed-audit/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: PageSpeedAuditOptions = {}): ReturnType<typeof mountPageSpeedAudit> {
  return mountPageSpeedAudit(target, options);
}
export type { PageSpeedAuditOptions };
