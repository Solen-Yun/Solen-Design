<script lang="ts">
import { onMount } from "svelte";
import { mountScrollspyToc, type ScrollspyTocOptions } from "../../components/scrollspy-toc/ScrollspyTocEngine.js";
import type { MotionController } from "../../components/scrollspy-toc/motion-runtime";
export let options: ScrollspyTocOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountScrollspyToc(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="scrollspy-toc"></div>
