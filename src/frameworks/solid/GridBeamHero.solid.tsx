/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountGridBeamHero, type GridBeamHeroOptions } from "../../components/grid-beam-hero/GridBeamHeroEngine.js";
import type { MotionController } from "../../components/grid-beam-hero/motion-runtime";

export function GridBeamHero(props: { options?: GridBeamHeroOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountGridBeamHero(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="grid-beam-hero" />;
}
