/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountPopulationPyramid, type PopulationPyramidOptions } from "../../components/population-pyramid/PopulationPyramidEngine.js";
import type { MotionController } from "../../components/population-pyramid/motion-runtime";

export function PopulationPyramid(props: { options?: PopulationPyramidOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountPopulationPyramid(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="population-pyramid" />;
}
