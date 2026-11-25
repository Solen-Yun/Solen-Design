<script lang="ts">
import { onMount } from "svelte";
import { mountStaggerRevealGrid, type StaggerRevealGridOptions } from "../../components/stagger-reveal-grid/StaggerRevealGridEngine.js";
import type { MotionController } from "../../components/stagger-reveal-grid/motion-runtime";
export let options: StaggerRevealGridOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountStaggerRevealGrid(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="stagger-reveal-grid"></div>
