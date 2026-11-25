/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountDomainConnect, type DomainConnectOptions } from "../../components/domain-connect/DomainConnectEngine.js";
import type { MotionController } from "../../components/domain-connect/motion-runtime";

export function DomainConnect(props: { options?: DomainConnectOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountDomainConnect(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="domain-connect" />;
}
