/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountBlueFlutedGlass, type BlueFlutedGlassOptions } from "../../components/blue-fluted-glass/BlueFlutedGlassEngine.js";
import type { MotionController } from "../../components/blue-fluted-glass/motion-runtime";

export function BlueFlutedGlass(props: { options?: BlueFlutedGlassOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountBlueFlutedGlass(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="blue-fluted-glass" />;
}
