import { mountSupportChatWidget, type SupportChatWidgetOptions } from "../../components/support-chat-widget/SupportChatWidgetEngine.js";
import type { MotionController } from "../../components/support-chat-widget/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: SupportChatWidgetOptions = {}): ReturnType<typeof mountSupportChatWidget> {
  return mountSupportChatWidget(target, options);
}
export type { SupportChatWidgetOptions };
