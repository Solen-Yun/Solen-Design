<script lang="ts">
import { onMount } from "svelte";
import { mountBlisterDropdown, type BlisterDropdownOptions } from "../../components/blister-dropdown/BlisterDropdownEngine.js";
import type { MotionController } from "../../components/blister-dropdown/motion-runtime";
export let options: BlisterDropdownOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountBlisterDropdown(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="blister-dropdown"></div>
