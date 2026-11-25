<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountCircularTextBadge, type CircularTextBadgeOptions } from "../../components/circular-text-badge/CircularTextBadgeEngine.js";
import type { MotionController } from "../../components/circular-text-badge/motion-runtime";
const props = defineProps<{ options?: CircularTextBadgeOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountCircularTextBadge(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="circular-text-badge" /></template>
