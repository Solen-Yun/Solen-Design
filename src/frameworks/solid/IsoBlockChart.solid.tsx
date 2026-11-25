/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountIsoBlockChart, type IsoBlockChartOptions } from "../../components/iso-block-chart/IsoBlockChartEngine.js";
import type { MotionController } from "../../components/iso-block-chart/motion-runtime";

export function IsoBlockChart(props: { options?: IsoBlockChartOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountIsoBlockChart(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="iso-block-chart" />;
}
