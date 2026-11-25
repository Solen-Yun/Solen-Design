/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountConditionalContact, type ConditionalContactOptions } from "../../components/conditional-contact/ConditionalContactEngine.js";
import type { MotionController } from "../../components/conditional-contact/motion-runtime";

export function ConditionalContact(props: { options?: ConditionalContactOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountConditionalContact(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="conditional-contact" />;
}
