/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountScrollDrawRoute, type ScrollDrawRouteOptions } from "../../components/scroll-draw-route/ScrollDrawRouteEngine.js";
import type { MotionController } from "../../components/scroll-draw-route/motion-runtime";

export function ScrollDrawRoute(props: { options?: ScrollDrawRouteOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountScrollDrawRoute(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="scroll-draw-route" />;
}
