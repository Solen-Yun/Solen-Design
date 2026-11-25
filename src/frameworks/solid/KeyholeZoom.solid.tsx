/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountKeyholeZoom, type KeyholeZoomOptions } from "../../components/keyhole-zoom/KeyholeZoomEngine.js";
import type { MotionController } from "../../components/keyhole-zoom/motion-runtime";

export function KeyholeZoom(props: { options?: KeyholeZoomOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountKeyholeZoom(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="keyhole-zoom" />;
}
