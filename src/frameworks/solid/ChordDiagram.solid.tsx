/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountChordDiagram, type ChordDiagramOptions } from "../../components/chord-diagram/ChordDiagramEngine.js";
import type { MotionController } from "../../components/chord-diagram/motion-runtime";

export function ChordDiagram(props: { options?: ChordDiagramOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountChordDiagram(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="chord-diagram" />;
}
