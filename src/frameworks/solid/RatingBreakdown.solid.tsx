/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountRatingBreakdown, type RatingBreakdownOptions } from "../../components/rating-breakdown/RatingBreakdownEngine.js";
import type { MotionController } from "../../components/rating-breakdown/motion-runtime";

export function RatingBreakdown(props: { options?: RatingBreakdownOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountRatingBreakdown(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="rating-breakdown" />;
}
