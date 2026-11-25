<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountFlowField, type FlowFieldOptions } from "../../components/flow-field/FlowFieldEngine.js";
import type { MotionController } from "../../components/flow-field/motion-runtime";
const props = defineProps<{ options?: FlowFieldOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountFlowField(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="flow-field" /></template>
