/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountTiltToFlatScreen, type TiltToFlatScreenOptions } from "../../components/tilt-to-flat-screen/TiltToFlatScreenEngine.js";
import type { MotionController } from "../../components/tilt-to-flat-screen/motion-runtime";

export function TiltToFlatScreen(props: { options?: TiltToFlatScreenOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountTiltToFlatScreen(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="tilt-to-flat-screen" />;
}
