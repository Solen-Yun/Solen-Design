<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountDragCardCarousel, type DragCardCarouselOptions } from "../../components/drag-card-carousel/DragCardCarouselEngine.js";
import type { MotionController } from "../../components/drag-card-carousel/motion-runtime";
const props = defineProps<{ options?: DragCardCarouselOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountDragCardCarousel(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="drag-card-carousel" /></template>
