/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountCookieConsent, type CookieConsentOptions } from "../../components/cookie-consent/CookieConsentEngine.js";
import type { MotionController } from "../../components/cookie-consent/motion-runtime";

export function CookieConsent(props: { options?: CookieConsentOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountCookieConsent(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="cookie-consent" />;
}
