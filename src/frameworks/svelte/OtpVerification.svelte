<script lang="ts">
import { onMount } from "svelte";
import { mountOtpVerification, type OtpVerificationOptions } from "../../components/otp-verification/OtpVerificationEngine.js";
import type { MotionController } from "../../components/otp-verification/motion-runtime";
export let options: OtpVerificationOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountOtpVerification(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="otp-verification"></div>
