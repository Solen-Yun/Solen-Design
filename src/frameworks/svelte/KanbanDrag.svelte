<script lang="ts">
import { onMount } from "svelte";
import { mountKanbanDrag, type KanbanDragOptions } from "../../components/kanban-drag/KanbanDragEngine.js";
import type { MotionController } from "../../components/kanban-drag/motion-runtime";
export let options: KanbanDragOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountKanbanDrag(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="kanban-drag"></div>
