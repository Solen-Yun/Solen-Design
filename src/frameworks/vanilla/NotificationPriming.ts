import { mountNotificationPriming, type NotificationPrimingOptions } from "../../components/notification-priming/NotificationPrimingEngine.js";
import type { MotionController } from "../../components/notification-priming/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: NotificationPrimingOptions = {}): ReturnType<typeof mountNotificationPriming> {
  return mountNotificationPriming(target, options);
}
export type { NotificationPrimingOptions };
