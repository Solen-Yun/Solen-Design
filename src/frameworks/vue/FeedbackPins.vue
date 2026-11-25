<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountFeedbackPins, type FeedbackPinsOptions } from "../../components/feedback-pins/FeedbackPinsEngine.js";
import type { MotionController } from "../../components/feedback-pins/motion-runtime";
const props = defineProps<{ options?: FeedbackPinsOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountFeedbackPins(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="feedback-pins" /></template>
