<script lang="ts">
import { onMount } from "svelte";
import { mountDetailExpand, type DetailExpandOptions } from "../../components/detail-expand/DetailExpandEngine.js";
import type { MotionController } from "../../components/detail-expand/motion-runtime";
export let options: DetailExpandOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountDetailExpand(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="detail-expand"></div>
