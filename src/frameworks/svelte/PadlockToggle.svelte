<script lang="ts">
import { onMount } from "svelte";
import { mountPadlockToggle, type PadlockToggleOptions } from "../../components/padlock-toggle/PadlockToggleEngine.js";
import type { MotionController } from "../../components/padlock-toggle/motion-runtime";
export let options: PadlockToggleOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountPadlockToggle(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="padlock-toggle"></div>
