/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountLettersScatter, type LettersScatterOptions } from "../../components/letters-scatter/LettersScatterEngine.js";
import type { MotionController } from "../../components/letters-scatter/motion-runtime";

export function LettersScatter(props: { options?: LettersScatterOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountLettersScatter(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="letters-scatter" />;
}
