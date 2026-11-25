/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountEmailTypoFix, type EmailTypoFixOptions } from "../../components/email-typo-fix/EmailTypoFixEngine.js";
import type { MotionController } from "../../components/email-typo-fix/motion-runtime";

export function EmailTypoFix(props: { options?: EmailTypoFixOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountEmailTypoFix(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="email-typo-fix" />;
}
