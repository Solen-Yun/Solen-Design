<script lang="ts">
import { onMount } from "svelte";
import { mountStackToFan, type StackToFanOptions } from "../../components/stack-to-fan/StackToFanEngine.js";
import type { MotionController } from "../../components/stack-to-fan/motion-runtime";
export let options: StackToFanOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountStackToFan(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="stack-to-fan"></div>
