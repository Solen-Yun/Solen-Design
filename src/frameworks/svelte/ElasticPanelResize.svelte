<script lang="ts">
import { onMount } from "svelte";
import { mountElasticPanelResize, type ElasticPanelResizeOptions } from "../../components/elastic-panel-resize/ElasticPanelResizeEngine.js";
import type { MotionController } from "../../components/elastic-panel-resize/motion-runtime";
export let options: ElasticPanelResizeOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountElasticPanelResize(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="elastic-panel-resize"></div>
