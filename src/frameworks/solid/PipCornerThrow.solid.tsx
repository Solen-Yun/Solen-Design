/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountPipCornerThrow, type PipCornerThrowOptions } from "../../components/pip-corner-throw/PipCornerThrowEngine.js";
import type { MotionController } from "../../components/pip-corner-throw/motion-runtime";

export function PipCornerThrow(props: { options?: PipCornerThrowOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountPipCornerThrow(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="pip-corner-throw" />;
}
