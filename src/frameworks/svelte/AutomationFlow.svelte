<script lang="ts">
import { onMount } from "svelte";
import { mountAutomationFlow, type AutomationFlowOptions } from "../../components/automation-flow/AutomationFlowEngine.js";
import type { MotionController } from "../../components/automation-flow/motion-runtime";
export let options: AutomationFlowOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountAutomationFlow(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="automation-flow"></div>
