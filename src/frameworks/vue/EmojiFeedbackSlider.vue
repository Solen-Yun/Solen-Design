<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountEmojiFeedbackSlider, type EmojiFeedbackSliderOptions } from "../../components/emoji-feedback-slider/EmojiFeedbackSliderEngine.js";
import type { MotionController } from "../../components/emoji-feedback-slider/motion-runtime";
const props = defineProps<{ options?: EmojiFeedbackSliderOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountEmojiFeedbackSlider(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="emoji-feedback-slider" /></template>
