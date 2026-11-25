<script lang="ts">
import { onMount } from "svelte";
import { mountParallaxMountains, type ParallaxMountainsOptions } from "../../components/parallax-mountains/ParallaxMountainsEngine.js";
import type { MotionController } from "../../components/parallax-mountains/motion-runtime";
export let options: ParallaxMountainsOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountParallaxMountains(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="parallax-mountains"></div>
