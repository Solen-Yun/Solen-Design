<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountAiImageGeneration, type AiImageGenerationOptions } from "../../components/ai-image-generation/AiImageGenerationEngine.js";
import type { MotionController } from "../../components/ai-image-generation/motion-runtime";
const props = defineProps<{ options?: AiImageGenerationOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountAiImageGeneration(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="ai-generating" /></template>
