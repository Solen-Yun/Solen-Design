<script lang="ts">
import { onMount } from "svelte";
import { mountSortFlipList, type SortFlipListOptions } from "../../components/sort-flip-list/SortFlipListEngine.js";
import type { MotionController } from "../../components/sort-flip-list/motion-runtime";
export let options: SortFlipListOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountSortFlipList(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="sort-flip-list"></div>
