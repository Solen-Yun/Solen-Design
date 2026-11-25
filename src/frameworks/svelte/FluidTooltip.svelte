<script lang="ts">
import { onMount } from "svelte";
import { mountFluidTooltip, type FluidTooltipOptions } from "../../components/fluid-tooltip/FluidTooltipEngine.js";
import type { MotionController } from "../../components/fluid-tooltip/motion-runtime";
export let options: FluidTooltipOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountFluidTooltip(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="fluid-tooltip"></div>
