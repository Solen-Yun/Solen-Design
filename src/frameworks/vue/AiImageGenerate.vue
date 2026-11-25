<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountAiImageGenerate, type AiImageGenerateOptions } from "../../components/ai-image-generate/AiImageGenerateEngine.js";
import type { MotionController } from "../../components/ai-image-generate/motion-runtime";
const props = defineProps<{ options?: AiImageGenerateOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountAiImageGenerate(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="ai-image-generate" /></template>
