<script lang="ts">
import { onMount } from "svelte";
import { mountPhoneCountryInput, type PhoneCountryInputOptions } from "../../components/phone-country-input/PhoneCountryInputEngine.js";
import type { MotionController } from "../../components/phone-country-input/motion-runtime";
export let options: PhoneCountryInputOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountPhoneCountryInput(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="phone-country-input"></div>
