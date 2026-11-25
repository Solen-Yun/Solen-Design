/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountBarChartRace, type BarChartRaceOptions } from "../../components/bar-chart-race/BarChartRaceEngine.js";
import type { MotionController } from "../../components/bar-chart-race/motion-runtime";

export function BarChartRace(props: { options?: BarChartRaceOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountBarChartRace(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="bar-chart-race" />;
}
