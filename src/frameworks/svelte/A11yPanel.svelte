<script lang="ts">
import { onMount } from "svelte";
import { mountA11yPanel, type A11yPanelOptions } from "../../components/a11y-panel/A11yPanelEngine.js";
import type { MotionController } from "../../components/a11y-panel/motion-runtime";
export let options: A11yPanelOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountA11yPanel(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="a11y-panel"></div>
