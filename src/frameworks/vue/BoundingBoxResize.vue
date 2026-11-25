<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountBoundingBoxResize, type BoundingBoxResizeOptions } from "../../components/bounding-box-resize/BoundingBoxResizeEngine.js";
import type { MotionController } from "../../components/bounding-box-resize/motion-runtime";
const props = defineProps<{ options?: BoundingBoxResizeOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountBoundingBoxResize(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="bounding-box-resize" /></template>
