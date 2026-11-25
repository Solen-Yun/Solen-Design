/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountWaffleChart, type WaffleChartOptions } from "../../components/waffle-chart/WaffleChartEngine.js";
import type { MotionController } from "../../components/waffle-chart/motion-runtime";

export function WaffleChart(props: { options?: WaffleChartOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountWaffleChart(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="waffle-chart" />;
}
