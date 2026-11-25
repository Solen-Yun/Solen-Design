<script lang="ts">
import { onMount } from "svelte";
import { mountMultiCursorBuilder, type MultiCursorBuilderOptions } from "../../components/multi-cursor-builder/MultiCursorBuilderEngine.js";
import type { MotionController } from "../../components/multi-cursor-builder/motion-runtime";
export let options: MultiCursorBuilderOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountMultiCursorBuilder(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="multi-cursor-builder"></div>
