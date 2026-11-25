<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountAiTldr, type AiTldrOptions } from "../../components/ai-tldr/AiTldrEngine.js";
import type { MotionController } from "../../components/ai-tldr/motion-runtime";
const props = defineProps<{ options?: AiTldrOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountAiTldr(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="ai-tldr" /></template>
