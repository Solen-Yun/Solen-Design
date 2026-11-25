<script lang="ts">
import { onMount } from "svelte";
import { mountSeoPreview, type SeoPreviewOptions } from "../../components/seo-preview/SeoPreviewEngine.js";
import type { MotionController } from "../../components/seo-preview/motion-runtime";
export let options: SeoPreviewOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountSeoPreview(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="seo-preview"></div>
