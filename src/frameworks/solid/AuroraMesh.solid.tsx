/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountAuroraMesh, type AuroraMeshOptions } from "../../components/aurora-mesh/AuroraMeshEngine.js";
import type { MotionController } from "../../components/aurora-mesh/motion-runtime";

export function AuroraMesh(props: { options?: AuroraMeshOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountAuroraMesh(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="aurora-mesh" />;
}
