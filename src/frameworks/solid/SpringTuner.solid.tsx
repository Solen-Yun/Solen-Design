/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountSpringTuner, type SpringTunerOptions } from "../../components/spring-tuner/SpringTunerEngine.js";
import type { MotionController } from "../../components/spring-tuner/motion-runtime";

export function SpringTuner(props: { options?: SpringTunerOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountSpringTuner(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="spring-tuner" />;
}
