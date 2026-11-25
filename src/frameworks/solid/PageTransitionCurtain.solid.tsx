/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountPageTransitionCurtain, type PageTransitionCurtainOptions } from "../../components/page-transition-curtain/PageTransitionCurtainEngine.js";
import type { MotionController } from "../../components/page-transition-curtain/motion-runtime";

export function PageTransitionCurtain(props: { options?: PageTransitionCurtainOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountPageTransitionCurtain(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="page-transition-curtain" />;
}
