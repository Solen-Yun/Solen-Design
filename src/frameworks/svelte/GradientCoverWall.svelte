<script lang="ts">
import { onMount } from "svelte";
import { mountGradientCoverWall, type GradientCoverWallOptions } from "../../components/gradient-cover-wall/GradientCoverWallEngine.js";
import type { MotionController } from "../../components/gradient-cover-wall/motion-runtime";
export let options: GradientCoverWallOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountGradientCoverWall(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="gradient-cover-wall"></div>
