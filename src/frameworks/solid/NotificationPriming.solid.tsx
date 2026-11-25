/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountNotificationPriming, type NotificationPrimingOptions } from "../../components/notification-priming/NotificationPrimingEngine.js";
import type { MotionController } from "../../components/notification-priming/motion-runtime";

export function NotificationPriming(props: { options?: NotificationPrimingOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountNotificationPriming(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="notification-priming" />;
}
