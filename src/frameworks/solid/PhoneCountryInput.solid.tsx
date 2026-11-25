/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountPhoneCountryInput, type PhoneCountryInputOptions } from "../../components/phone-country-input/PhoneCountryInputEngine.js";
import type { MotionController } from "../../components/phone-country-input/motion-runtime";

export function PhoneCountryInput(props: { options?: PhoneCountryInputOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountPhoneCountryInput(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="phone-country-input" />;
}
