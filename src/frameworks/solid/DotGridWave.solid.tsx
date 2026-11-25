/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountDotGridWave, type DotGridWaveOptions } from "../../components/dot-grid-wave/DotGridWaveEngine.js";
import type { MotionController } from "../../components/dot-grid-wave/motion-runtime";

export function DotGridWave(props: { options?: DotGridWaveOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountDotGridWave(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="dot-grid-wave" />;
}
