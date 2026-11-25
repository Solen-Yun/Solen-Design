<script lang="ts">
import { onMount } from "svelte";
import { mountCookieConsent, type CookieConsentOptions } from "../../components/cookie-consent/CookieConsentEngine.js";
import type { MotionController } from "../../components/cookie-consent/motion-runtime";
export let options: CookieConsentOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountCookieConsent(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="cookie-consent"></div>
