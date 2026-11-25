<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountDeepAgentComposer, type DeepAgentComposerOptions } from "../../components/deep-agent-composer/DeepAgentComposerEngine.js";
import type { MotionController } from "../../components/deep-agent-composer/motion-runtime";
const props = defineProps<{ options?: DeepAgentComposerOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountDeepAgentComposer(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="deep-agent-composer" /></template>
