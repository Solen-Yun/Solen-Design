/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountHammerheadChart, type HammerheadChartOptions } from "../../components/hammerhead-chart/HammerheadChartEngine.js";
import type { MotionController } from "../../components/hammerhead-chart/motion-runtime";

export function HammerheadChart(props: { options?: HammerheadChartOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountHammerheadChart(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="hammerhead-chart" />;
}
