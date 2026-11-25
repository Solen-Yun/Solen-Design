<script lang="ts">
import { onMount } from "svelte";
import { mountPaletteGenerator, type PaletteGeneratorOptions } from "../../components/palette-generator/PaletteGeneratorEngine.js";
import type { MotionController } from "../../components/palette-generator/motion-runtime";
export let options: PaletteGeneratorOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountPaletteGenerator(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="palette-generator"></div>
