/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountGradientCoverWall, type GradientCoverWallOptions } from "../../components/gradient-cover-wall/GradientCoverWallEngine.js";
import type { MotionController } from "../../components/gradient-cover-wall/motion-runtime";

export function GradientCoverWall(props: { options?: GradientCoverWallOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountGradientCoverWall(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="gradient-cover-wall" />;
}
