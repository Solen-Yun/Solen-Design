<script lang="ts">
import { onMount } from "svelte";
import { mountGlassTabMenu, type GlassTabMenuOptions } from "../../components/glass-tab-menu/GlassTabMenuEngine.js";
import type { MotionController } from "../../components/glass-tab-menu/motion-runtime";
export let options: GlassTabMenuOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountGlassTabMenu(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="glass-tab-menu"></div>
