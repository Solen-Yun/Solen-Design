/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountParallaxMountains, type ParallaxMountainsOptions } from "../../components/parallax-mountains/ParallaxMountainsEngine.js";
import type { MotionController } from "../../components/parallax-mountains/motion-runtime";

export function ParallaxMountains(props: { options?: ParallaxMountainsOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountParallaxMountains(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="parallax-mountains" />;
}
