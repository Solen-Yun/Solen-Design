/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountScrollspyToc, type ScrollspyTocOptions } from "../../components/scrollspy-toc/ScrollspyTocEngine.js";
import type { MotionController } from "../../components/scrollspy-toc/motion-runtime";

export function ScrollspyToc(props: { options?: ScrollspyTocOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountScrollspyToc(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="scrollspy-toc" />;
}
