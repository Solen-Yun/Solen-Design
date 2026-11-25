/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountDotGlobe, type DotGlobeOptions } from "../../components/dot-globe/DotGlobeEngine.js";
import type { MotionController } from "../../components/dot-globe/motion-runtime";

export function DotGlobe(props: { options?: DotGlobeOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountDotGlobe(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="dot-globe" />;
}
