/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountSharedElementDetail, type SharedElementDetailOptions } from "../../components/shared-element-detail/SharedElementDetailEngine.js";
import type { MotionController } from "../../components/shared-element-detail/motion-runtime";

export function SharedElementDetail(props: { options?: SharedElementDetailOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountSharedElementDetail(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="shared-element-detail" />;
}
