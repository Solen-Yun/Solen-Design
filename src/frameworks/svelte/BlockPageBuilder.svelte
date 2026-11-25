<script lang="ts">
import { onMount } from "svelte";
import { mountBlockPageBuilder, type BlockPageBuilderOptions } from "../../components/block-page-builder/BlockPageBuilderEngine.js";
import type { MotionController } from "../../components/block-page-builder/motion-runtime";
export let options: BlockPageBuilderOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountBlockPageBuilder(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="block-page-builder"></div>
