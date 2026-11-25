/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountInfiniteSpiral, type InfiniteSpiralOptions } from "../../components/infinite-spiral/InfiniteSpiralEngine.js";

export function InfiniteSpiral(props: { options?: InfiniteSpiralOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: ReturnType<typeof mountInfiniteSpiral> | undefined;
  onMount(() => { controller = mountInfiniteSpiral(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="infinite-spiral" />;
}
