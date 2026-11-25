<script lang="ts">
import { onMount } from "svelte";
import { mountPipCornerThrow, type PipCornerThrowOptions } from "../../components/pip-corner-throw/PipCornerThrowEngine.js";
import type { MotionController } from "../../components/pip-corner-throw/motion-runtime";
export let options: PipCornerThrowOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountPipCornerThrow(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="pip-corner-throw"></div>
