/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountWordCube, type WordCubeOptions } from "../../components/word-cube/WordCubeEngine.js";
import type { MotionController } from "../../components/word-cube/motion-runtime";

export function WordCube(props: { options?: WordCubeOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountWordCube(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="word-cube" />;
}
