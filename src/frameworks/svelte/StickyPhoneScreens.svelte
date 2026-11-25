<script lang="ts">
import { onMount } from "svelte";
import { mountStickyPhoneScreens, type StickyPhoneScreensOptions } from "../../components/sticky-phone-screens/StickyPhoneScreensEngine.js";
import type { MotionController } from "../../components/sticky-phone-screens/motion-runtime";
export let options: StickyPhoneScreensOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountStickyPhoneScreens(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="sticky-phone-screens"></div>
