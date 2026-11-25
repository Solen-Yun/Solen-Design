/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountDeliveryCutoff, type DeliveryCutoffOptions } from "../../components/delivery-cutoff/DeliveryCutoffEngine.js";
import type { MotionController } from "../../components/delivery-cutoff/motion-runtime";

export function DeliveryCutoff(props: { options?: DeliveryCutoffOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountDeliveryCutoff(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="delivery-cutoff" />;
}
