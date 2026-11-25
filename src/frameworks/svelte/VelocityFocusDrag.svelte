<script lang="ts">
import { onMount } from "svelte";
import { mountVelocityFocusDrag, type VelocityFocusDragOptions } from "../../components/velocity-drag/VelocityFocusDragEngine.js";
import type { MotionController } from "../../components/velocity-drag/motion-runtime";
export let options: VelocityFocusDragOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountVelocityFocusDrag(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="velocity-drag"></div>
