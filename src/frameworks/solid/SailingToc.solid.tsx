/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountSailingToc, type SailingTocOptions } from "../../components/sailing-toc/SailingTocEngine.js";
import type { MotionController } from "../../components/sailing-toc/motion-runtime";

export function SailingToc(props: { options?: SailingTocOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountSailingToc(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="sailing-toc" />;
}
