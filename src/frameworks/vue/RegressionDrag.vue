<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountRegressionDrag, type RegressionDragOptions } from "../../components/regression-drag/RegressionDragEngine.js";
import type { MotionController } from "../../components/regression-drag/motion-runtime";
const props = defineProps<{ options?: RegressionDragOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountRegressionDrag(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="regression-drag" /></template>
