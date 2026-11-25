<script lang="ts">
import { onMount } from "svelte";
import { mountDragToTrash, type DragToTrashOptions } from "../../components/drag-to-trash/DragToTrashEngine.js";
import type { MotionController } from "../../components/drag-to-trash/motion-runtime";
export let options: DragToTrashOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountDragToTrash(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="drag-to-trash"></div>
