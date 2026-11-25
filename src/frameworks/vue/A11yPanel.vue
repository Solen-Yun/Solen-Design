<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountA11yPanel, type A11yPanelOptions } from "../../components/a11y-panel/A11yPanelEngine.js";
import type { MotionController } from "../../components/a11y-panel/motion-runtime";
const props = defineProps<{ options?: A11yPanelOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountA11yPanel(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="a11y-panel" /></template>
