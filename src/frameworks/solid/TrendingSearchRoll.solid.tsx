/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountTrendingSearchRoll, type TrendingSearchRollOptions } from "../../components/trending-search-roll/TrendingSearchRollEngine.js";
import type { MotionController } from "../../components/trending-search-roll/motion-runtime";

export function TrendingSearchRoll(props: { options?: TrendingSearchRollOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountTrendingSearchRoll(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="trending-search-roll" />;
}
