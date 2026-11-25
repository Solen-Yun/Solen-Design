/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountMorphingButtonForm, type MorphingButtonFormOptions } from "../../components/morphing-button-form/MorphingButtonFormEngine.js";
import type { MotionController } from "../../components/morphing-button-form/motion-runtime";

export function MorphingButtonForm(props: { options?: MorphingButtonFormOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountMorphingButtonForm(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="morphing-button-form" />;
}
