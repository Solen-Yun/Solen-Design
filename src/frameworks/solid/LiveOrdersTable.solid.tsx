/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountLiveOrdersTable, type LiveOrdersTableOptions } from "../../components/live-orders-table/LiveOrdersTableEngine.js";
import type { MotionController } from "../../components/live-orders-table/motion-runtime";

export function LiveOrdersTable(props: { options?: LiveOrdersTableOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountLiveOrdersTable(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="live-orders-table" />;
}
