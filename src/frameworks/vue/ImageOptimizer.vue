<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountImageOptimizer, type ImageOptimizerOptions } from "../../components/image-optimizer/ImageOptimizerEngine.js";
import type { MotionController } from "../../components/image-optimizer/motion-runtime";
const props = defineProps<{ options?: ImageOptimizerOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountImageOptimizer(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="image-optimizer" /></template>
