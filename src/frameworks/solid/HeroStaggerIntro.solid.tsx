/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountHeroStaggerIntro, type HeroStaggerIntroOptions } from "../../components/hero-stagger-intro/HeroStaggerIntroEngine.js";
import type { MotionController } from "../../components/hero-stagger-intro/motion-runtime";

export function HeroStaggerIntro(props: { options?: HeroStaggerIntroOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountHeroStaggerIntro(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="hero-stagger-intro" />;
}
