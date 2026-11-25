<script lang="ts">
import { onMount } from "svelte";
import { mountAiTldr, type AiTldrOptions } from "../../components/ai-tldr/AiTldrEngine.js";
import type { MotionController } from "../../components/ai-tldr/motion-runtime";
export let options: AiTldrOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountAiTldr(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="ai-tldr"></div>
