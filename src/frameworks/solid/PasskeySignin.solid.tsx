/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountPasskeySignin, type PasskeySigninOptions } from "../../components/passkey-signin/PasskeySigninEngine.js";
import type { MotionController } from "../../components/passkey-signin/motion-runtime";

export function PasskeySignin(props: { options?: PasskeySigninOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountPasskeySignin(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="passkey-signin" />;
}
