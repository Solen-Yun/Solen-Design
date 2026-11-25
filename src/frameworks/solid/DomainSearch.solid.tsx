/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountDomainSearch, type DomainSearchOptions } from "../../components/domain-search/DomainSearchEngine.js";
import type { MotionController } from "../../components/domain-search/motion-runtime";

export function DomainSearch(props: { options?: DomainSearchOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountDomainSearch(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="domain-search" />;
}
