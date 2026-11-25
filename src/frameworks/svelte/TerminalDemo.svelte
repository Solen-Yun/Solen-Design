<script lang="ts">
import { onMount } from "svelte";
import { mountTerminalDemo, type TerminalDemoOptions } from "../../components/terminal-demo/TerminalDemoEngine.js";
import type { MotionController } from "../../components/terminal-demo/motion-runtime";
export let options: TerminalDemoOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountTerminalDemo(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="terminal-demo"></div>
