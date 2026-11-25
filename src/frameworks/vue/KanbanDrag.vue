<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountKanbanDrag, type KanbanDragOptions } from "../../components/kanban-drag/KanbanDragEngine.js";
import type { MotionController } from "../../components/kanban-drag/motion-runtime";
const props = defineProps<{ options?: KanbanDragOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountKanbanDrag(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="kanban-drag" /></template>
