/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountBlockPageBuilder, type BlockPageBuilderOptions } from "../../components/block-page-builder/BlockPageBuilderEngine.js";
import type { MotionController } from "../../components/block-page-builder/motion-runtime";

export function BlockPageBuilder(props: { options?: BlockPageBuilderOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountBlockPageBuilder(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="block-page-builder" />;
}
