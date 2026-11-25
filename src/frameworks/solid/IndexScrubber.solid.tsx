/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountIndexScrubber, type IndexScrubberOptions } from "../../components/index-scrubber/IndexScrubberEngine.js";
import type { MotionController } from "../../components/index-scrubber/motion-runtime";

export function IndexScrubber(props: { options?: IndexScrubberOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountIndexScrubber(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="index-scrubber" />;
}
