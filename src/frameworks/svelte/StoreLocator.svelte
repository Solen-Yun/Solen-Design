<script lang="ts">
import { onMount } from "svelte";
import { mountStoreLocator, type StoreLocatorOptions } from "../../components/store-locator/StoreLocatorEngine.js";
import type { MotionController } from "../../components/store-locator/motion-runtime";
export let options: StoreLocatorOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountStoreLocator(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="store-locator"></div>
