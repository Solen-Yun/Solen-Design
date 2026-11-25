/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountPaletteGenerator, type PaletteGeneratorOptions } from "../../components/palette-generator/PaletteGeneratorEngine.js";
import type { MotionController } from "../../components/palette-generator/motion-runtime";

export function PaletteGenerator(props: { options?: PaletteGeneratorOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountPaletteGenerator(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="palette-generator" />;
}
