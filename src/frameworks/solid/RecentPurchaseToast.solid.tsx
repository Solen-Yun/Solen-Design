/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountRecentPurchaseToast, type RecentPurchaseToastOptions } from "../../components/recent-purchase-toast/RecentPurchaseToastEngine.js";
import type { MotionController } from "../../components/recent-purchase-toast/motion-runtime";

export function RecentPurchaseToast(props: { options?: RecentPurchaseToastOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountRecentPurchaseToast(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="recent-purchase-toast" />;
}
