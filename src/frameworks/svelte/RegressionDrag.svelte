<script lang="ts">
import { onMount } from "svelte";
import { mountRegressionDrag, type RegressionDragOptions } from "../../components/regression-drag/RegressionDragEngine.js";
import type { MotionController } from "../../components/regression-drag/motion-runtime";
export let options: RegressionDragOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountRegressionDrag(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="regression-drag"></div>
