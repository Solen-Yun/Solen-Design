<script lang="ts">
import { onMount } from "svelte";
import { mountStackedMetadata, type StackedMetadataOptions } from "../../components/stacked-metadata/StackedMetadataEngine.js";
import type { MotionController } from "../../components/stacked-metadata/motion-runtime";
export let options: StackedMetadataOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountStackedMetadata(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="stacked-metadata"></div>
