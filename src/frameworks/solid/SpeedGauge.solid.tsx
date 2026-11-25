/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountSpeedGauge, type SpeedGaugeOptions } from "../../components/speed-gauge/SpeedGaugeEngine.js";
import type { MotionController } from "../../components/speed-gauge/motion-runtime";

export function SpeedGauge(props: { options?: SpeedGaugeOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountSpeedGauge(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="speed-gauge" />;
}
