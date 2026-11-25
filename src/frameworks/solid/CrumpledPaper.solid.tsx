/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountCrumpledPaper, type CrumpledPaperOptions } from "../../components/crumpled-paper/CrumpledPaperEngine.js";
import type { MotionController } from "../../components/crumpled-paper/motion-runtime";

export function CrumpledPaper(props: { options?: CrumpledPaperOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountCrumpledPaper(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="crumpled-paper" />;
}
