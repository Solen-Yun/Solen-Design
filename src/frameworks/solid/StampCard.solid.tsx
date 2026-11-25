/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountStampCard, type StampCardOptions } from "../../components/stamp-card/StampCardEngine.js";
import type { MotionController } from "../../components/stamp-card/motion-runtime";

export function StampCard(props: { options?: StampCardOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountStampCard(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="stamp-card" />;
}
