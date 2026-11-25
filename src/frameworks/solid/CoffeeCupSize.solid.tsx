/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountCoffeeCupSize, type CoffeeCupSizeOptions } from "../../components/coffee-cup-size/CoffeeCupSizeEngine.js";
import type { MotionController } from "../../components/coffee-cup-size/motion-runtime";

export function CoffeeCupSize(props: { options?: CoffeeCupSizeOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountCoffeeCupSize(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="coffee-cup-size" />;
}
