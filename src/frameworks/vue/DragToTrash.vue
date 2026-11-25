<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountDragToTrash, type DragToTrashOptions } from "../../components/drag-to-trash/DragToTrashEngine.js";
import type { MotionController } from "../../components/drag-to-trash/motion-runtime";
const props = defineProps<{ options?: DragToTrashOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountDragToTrash(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="drag-to-trash" /></template>
