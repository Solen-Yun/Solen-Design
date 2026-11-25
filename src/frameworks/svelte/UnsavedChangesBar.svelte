<script lang="ts">
import { onMount } from "svelte";
import { mountUnsavedChangesBar, type UnsavedChangesBarOptions } from "../../components/unsaved-changes-bar/UnsavedChangesBarEngine.js";
import type { MotionController } from "../../components/unsaved-changes-bar/motion-runtime";
export let options: UnsavedChangesBarOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountUnsavedChangesBar(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="unsaved-changes-bar"></div>
