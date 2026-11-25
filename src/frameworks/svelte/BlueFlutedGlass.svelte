<script lang="ts">
import { onMount } from "svelte";
import { mountBlueFlutedGlass, type BlueFlutedGlassOptions } from "../../components/blue-fluted-glass/BlueFlutedGlassEngine.js";
import type { MotionController } from "../../components/blue-fluted-glass/motion-runtime";
export let options: BlueFlutedGlassOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountBlueFlutedGlass(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="blue-fluted-glass"></div>
