/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountSlopeChart, type SlopeChartOptions } from "../../components/slope-chart/SlopeChartEngine.js";
import type { MotionController } from "../../components/slope-chart/motion-runtime";

export function SlopeChart(props: { options?: SlopeChartOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountSlopeChart(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="slope-chart" />;
}
