<script lang="ts">
import { onMount } from "svelte";
import { mountMobileDrillMenu, type MobileDrillMenuOptions } from "../../components/mobile-drill-menu/MobileDrillMenuEngine.js";
import type { MotionController } from "../../components/mobile-drill-menu/motion-runtime";
export let options: MobileDrillMenuOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountMobileDrillMenu(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="mobile-drill-menu"></div>
