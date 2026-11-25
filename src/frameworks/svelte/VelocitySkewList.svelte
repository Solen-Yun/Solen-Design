<script lang="ts">
import { onMount } from "svelte";
import { mountVelocitySkewList, type VelocitySkewListOptions } from "../../components/velocity-skew-list/VelocitySkewListEngine.js";
import type { MotionController } from "../../components/velocity-skew-list/motion-runtime";
export let options: VelocitySkewListOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountVelocitySkewList(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="velocity-skew-list"></div>
