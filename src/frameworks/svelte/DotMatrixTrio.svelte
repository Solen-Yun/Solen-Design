<script lang="ts">
import { onMount } from "svelte";
import { mountDotMatrixTrio, type DotMatrixTrioOptions } from "../../components/dot-matrix-trio/DotMatrixTrioEngine.js";
import type { MotionController } from "../../components/dot-matrix-trio/motion-runtime";
export let options: DotMatrixTrioOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountDotMatrixTrio(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="dot-matrix-trio"></div>
