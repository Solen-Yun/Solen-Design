/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountAdventDoors, type AdventDoorsOptions } from "../../components/advent-doors/AdventDoorsEngine.js";
import type { MotionController } from "../../components/advent-doors/motion-runtime";

export function AdventDoors(props: { options?: AdventDoorsOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountAdventDoors(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="advent-doors" />;
}
