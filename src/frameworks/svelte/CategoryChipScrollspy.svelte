<script lang="ts">
import { onMount } from "svelte";
import { mountCategoryChipScrollspy, type CategoryChipScrollspyOptions } from "../../components/category-chip-scrollspy/CategoryChipScrollspyEngine.js";
import type { MotionController } from "../../components/category-chip-scrollspy/motion-runtime";
export let options: CategoryChipScrollspyOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountCategoryChipScrollspy(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="category-chip-scrollspy"></div>
