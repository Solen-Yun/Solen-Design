<script lang="ts">
import { onMount } from "svelte";
import { mountLogoWallCycle, type LogoWallCycleOptions } from "../../components/logo-wall-cycle/LogoWallCycleEngine.js";
import type { MotionController } from "../../components/logo-wall-cycle/motion-runtime";
export let options: LogoWallCycleOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountLogoWallCycle(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="logo-wall-cycle"></div>
