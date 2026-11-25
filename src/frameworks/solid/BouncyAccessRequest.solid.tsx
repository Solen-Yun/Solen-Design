/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountBouncyAccessRequest, type BouncyAccessRequestOptions } from "../../components/bouncy-access-request/BouncyAccessRequestEngine.js";
import type { MotionController } from "../../components/bouncy-access-request/motion-runtime";

export function BouncyAccessRequest(props: { options?: BouncyAccessRequestOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountBouncyAccessRequest(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="bouncy-access" />;
}
