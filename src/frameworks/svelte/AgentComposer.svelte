<script lang="ts">
import { onMount } from "svelte";
import { mountAgentComposer, type AgentComposerOptions } from "../../components/agent-composer/AgentComposerEngine.js";
import type { MotionController } from "../../components/agent-composer/motion-runtime";
export let options: AgentComposerOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountAgentComposer(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="agent-composer"></div>
