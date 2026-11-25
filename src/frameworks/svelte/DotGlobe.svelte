<script lang="ts">
import { onMount } from "svelte";
import { mountDotGlobe, type DotGlobeOptions } from "../../components/dot-globe/DotGlobeEngine.js";
import type { MotionController } from "../../components/dot-globe/motion-runtime";
export let options: DotGlobeOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountDotGlobe(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="dot-globe"></div>
