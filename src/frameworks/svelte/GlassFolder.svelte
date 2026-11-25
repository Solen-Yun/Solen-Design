<script lang="ts">
import { onMount } from "svelte";
import { mountGlassFolder, type GlassFolderOptions } from "../../components/glass-folder/GlassFolderEngine.js";
import type { MotionController } from "../../components/glass-folder/motion-runtime";
export let options: GlassFolderOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountGlassFolder(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="glass-folder"></div>
