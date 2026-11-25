<script lang="ts">
import { onMount } from "svelte";
import { mountSharedElementDetail, type SharedElementDetailOptions } from "../../components/shared-element-detail/SharedElementDetailEngine.js";
import type { MotionController } from "../../components/shared-element-detail/motion-runtime";
export let options: SharedElementDetailOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountSharedElementDetail(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="shared-element-detail"></div>
