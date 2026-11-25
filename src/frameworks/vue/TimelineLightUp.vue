<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountTimelineLightUp, type TimelineLightUpOptions } from "../../components/timeline-light-up/TimelineLightUpEngine.js";
import type { MotionController } from "../../components/timeline-light-up/motion-runtime";
const props = defineProps<{ options?: TimelineLightUpOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountTimelineLightUp(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="timeline-light-up" /></template>
