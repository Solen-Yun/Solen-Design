<script lang="ts">
import { onMount } from "svelte";
import { mountDockingMiniPlayer, type DockingMiniPlayerOptions } from "../../components/docking-mini-player/DockingMiniPlayerEngine.js";
import type { MotionController } from "../../components/docking-mini-player/motion-runtime";
export let options: DockingMiniPlayerOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountDockingMiniPlayer(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="docking-mini-player"></div>
