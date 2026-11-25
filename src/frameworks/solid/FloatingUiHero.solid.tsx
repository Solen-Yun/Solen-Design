/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountFloatingUiHero, type FloatingUiHeroOptions } from "../../components/floating-ui-hero/FloatingUiHeroEngine.js";
import type { MotionController } from "../../components/floating-ui-hero/motion-runtime";

export function FloatingUiHero(props: { options?: FloatingUiHeroOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountFloatingUiHero(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="floating-ui-hero" />;
}
