<script lang="ts">
import { onMount } from "svelte";
import { mountCrumpledPaper, type CrumpledPaperOptions } from "../../components/crumpled-paper/CrumpledPaperEngine.js";
import type { MotionController } from "../../components/crumpled-paper/motion-runtime";
export let options: CrumpledPaperOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountCrumpledPaper(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="crumpled-paper"></div>
