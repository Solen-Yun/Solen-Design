<script lang="ts">
import { onMount } from "svelte";
import { mountGridBeamHero, type GridBeamHeroOptions } from "../../components/grid-beam-hero/GridBeamHeroEngine.js";
import type { MotionController } from "../../components/grid-beam-hero/motion-runtime";
export let options: GridBeamHeroOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountGridBeamHero(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="grid-beam-hero"></div>
