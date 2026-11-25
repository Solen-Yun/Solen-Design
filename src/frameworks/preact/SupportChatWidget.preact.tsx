/** @jsxImportSource preact */
import { useEffect, useRef } from "preact/hooks";
import { mountSupportChatWidget, type SupportChatWidgetOptions } from "../../components/support-chat-widget/SupportChatWidgetEngine.js";
import type { MotionController } from "../../components/support-chat-widget/motion-runtime";

export function SupportChatWidget({ options, className }: { options?: SupportChatWidgetOptions; className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<MotionController | null>(null);
  useEffect(() => {
    const instance = mountSupportChatWidget(host.current!, options);
    controller.current = instance;
    return () => { instance.destroy(); controller.current = null; };
    // Options are updated below without remounting the state machine.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { controller.current?.update(options ?? {}); }, [options]);
  return <div ref={host} className={className} data-motion-component="support-chat-widget" />;
}
