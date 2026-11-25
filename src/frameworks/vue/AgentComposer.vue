<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountAgentComposer, type AgentComposerOptions } from "../../components/agent-composer/AgentComposerEngine.js";
import type { MotionController } from "../../components/agent-composer/motion-runtime";
const props = defineProps<{ options?: AgentComposerOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountAgentComposer(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="agent-composer" /></template>
