/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountMegaMenuMorph, type MegaMenuMorphOptions } from "../../components/mega-menu-morph/MegaMenuMorphEngine.js";
import type { MotionController } from "../../components/mega-menu-morph/motion-runtime";

export function MegaMenuMorph(props: { options?: MegaMenuMorphOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountMegaMenuMorph(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="mega-menu-morph" />;
}
