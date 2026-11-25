import { mountAnnouncementPill, type AnnouncementPillOptions } from "../../components/announcement-pill/AnnouncementPillEngine.js";
import type { MotionController } from "../../components/announcement-pill/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: AnnouncementPillOptions = {}): ReturnType<typeof mountAnnouncementPill> {
  return mountAnnouncementPill(target, options);
}
export type { AnnouncementPillOptions };
