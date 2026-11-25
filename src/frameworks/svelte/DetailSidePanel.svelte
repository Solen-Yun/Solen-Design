<script lang="ts">
import { onMount } from "svelte";
import { mountDetailSidePanel, type DetailSidePanelOptions } from "../../components/detail-side-panel/DetailSidePanelEngine.js";
import type { MotionController } from "../../components/detail-side-panel/motion-runtime";
export let options: DetailSidePanelOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountDetailSidePanel(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="detail-side-panel"></div>
