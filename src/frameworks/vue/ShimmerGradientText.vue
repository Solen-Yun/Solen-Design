<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountShimmerGradientText, type ShimmerGradientTextOptions } from "../../components/shimmer-gradient-text/ShimmerGradientTextEngine.js";
import type { MotionController } from "../../components/shimmer-gradient-text/motion-runtime";
const props = defineProps<{ options?: ShimmerGradientTextOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountShimmerGradientText(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="shimmer-gradient-text" /></template>
