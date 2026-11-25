/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountOtpVerification, type OtpVerificationOptions } from "../../components/otp-verification/OtpVerificationEngine.js";
import type { MotionController } from "../../components/otp-verification/motion-runtime";

export function OtpVerification(props: { options?: OtpVerificationOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountOtpVerification(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="otp-verification" />;
}
