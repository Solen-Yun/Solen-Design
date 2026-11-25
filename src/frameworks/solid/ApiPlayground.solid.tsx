/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountApiPlayground, type ApiPlaygroundOptions } from "../../components/api-playground/ApiPlaygroundEngine.js";
import type { MotionController } from "../../components/api-playground/motion-runtime";

export function ApiPlayground(props: { options?: ApiPlaygroundOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountApiPlayground(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="api-playground" />;
}
