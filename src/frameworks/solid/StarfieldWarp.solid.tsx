/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountStarfieldWarp, type StarfieldWarpOptions } from "../../components/starfield-warp/StarfieldWarpEngine.js";
import type { MotionController } from "../../components/starfield-warp/motion-runtime";

export function StarfieldWarp(props: { options?: StarfieldWarpOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountStarfieldWarp(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="starfield-warp" />;
}
