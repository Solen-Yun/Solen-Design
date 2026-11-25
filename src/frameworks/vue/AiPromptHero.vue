<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountAiPromptHero, type AiPromptHeroOptions } from "../../components/ai-prompt-hero/AiPromptHeroEngine.js";
import type { MotionController } from "../../components/ai-prompt-hero/motion-runtime";
const props = defineProps<{ options?: AiPromptHeroOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountAiPromptHero(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="ai-prompt-hero" /></template>
