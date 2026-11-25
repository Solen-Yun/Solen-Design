<script lang="ts">
import { onMount } from "svelte";
import { mountAutosaveIndicator, type AutosaveIndicatorOptions } from "../../components/autosave-indicator/AutosaveIndicatorEngine.js";
import type { MotionController } from "../../components/autosave-indicator/motion-runtime";
export let options: AutosaveIndicatorOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountAutosaveIndicator(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="autosave-indicator"></div>
