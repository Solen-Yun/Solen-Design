/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountSyncedMultiples, type SyncedMultiplesOptions } from "../../components/synced-multiples/SyncedMultiplesEngine.js";
import type { MotionController } from "../../components/synced-multiples/motion-runtime";

export function SyncedMultiples(props: { options?: SyncedMultiplesOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountSyncedMultiples(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="synced-multiples" />;
}
