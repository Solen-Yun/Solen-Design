/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountSupportChatWidget, type SupportChatWidgetOptions } from "../../components/support-chat-widget/SupportChatWidgetEngine.js";
import type { MotionController } from "../../components/support-chat-widget/motion-runtime";

export function SupportChatWidget(props: { options?: SupportChatWidgetOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountSupportChatWidget(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="support-chat-widget" />;
}
