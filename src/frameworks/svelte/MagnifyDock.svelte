<script lang="ts">
import { onMount } from "svelte";
import { mountMagnifyDock, type MagnifyDockOptions } from "../../components/magnify-dock/MagnifyDockEngine.js";
import type { MotionController } from "../../components/magnify-dock/motion-runtime";
export let options: MagnifyDockOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountMagnifyDock(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="magnify-dock"></div>
