<script lang="ts">
import { onMount } from "svelte";
import { mountPlanCompareTable, type PlanCompareTableOptions } from "../../components/plan-compare-table/PlanCompareTableEngine.js";
import type { MotionController } from "../../components/plan-compare-table/motion-runtime";
export let options: PlanCompareTableOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountPlanCompareTable(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="plan-compare-table"></div>
