<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountAutosaveIndicator, type AutosaveIndicatorOptions } from "../../components/autosave-indicator/AutosaveIndicatorEngine.js";
import type { MotionController } from "../../components/autosave-indicator/motion-runtime";
const props = defineProps<{ options?: AutosaveIndicatorOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountAutosaveIndicator(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="autosave-indicator" /></template>
