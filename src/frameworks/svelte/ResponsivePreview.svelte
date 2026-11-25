<script lang="ts">
import { onMount } from "svelte";
import { mountResponsivePreview, type ResponsivePreviewOptions } from "../../components/responsive-preview/ResponsivePreviewEngine.js";
import type { MotionController } from "../../components/responsive-preview/motion-runtime";
export let options: ResponsivePreviewOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountResponsivePreview(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="responsive-preview"></div>
