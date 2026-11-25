<script lang="ts">
import { onMount } from "svelte";
import { mountAddressSearch, type AddressSearchOptions } from "../../components/address-search/AddressSearchEngine.js";
import type { MotionController } from "../../components/address-search/motion-runtime";
export let options: AddressSearchOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountAddressSearch(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="address-search"></div>
