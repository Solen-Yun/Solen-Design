<script lang="ts">
import { onMount } from "svelte";
import { mountFlowField, type FlowFieldOptions } from "../../components/flow-field/FlowFieldEngine.js";
import type { MotionController } from "../../components/flow-field/motion-runtime";
export let options: FlowFieldOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountFlowField(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="flow-field"></div>
