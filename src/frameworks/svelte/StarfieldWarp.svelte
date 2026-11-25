<script lang="ts">
import { onMount } from "svelte";
import { mountStarfieldWarp, type StarfieldWarpOptions } from "../../components/starfield-warp/StarfieldWarpEngine.js";
import type { MotionController } from "../../components/starfield-warp/motion-runtime";
export let options: StarfieldWarpOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountStarfieldWarp(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="starfield-warp"></div>
