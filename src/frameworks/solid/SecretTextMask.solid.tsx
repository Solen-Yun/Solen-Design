/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountSecretTextMask, type SecretTextMaskOptions } from "../../components/secret-text-mask/SecretTextMaskEngine.js";
import type { MotionController } from "../../components/secret-text-mask/motion-runtime";

export function SecretTextMask(props: { options?: SecretTextMaskOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountSecretTextMask(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="secret-text-mask" />;
}
