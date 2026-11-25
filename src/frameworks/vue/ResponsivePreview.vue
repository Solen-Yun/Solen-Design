<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountResponsivePreview, type ResponsivePreviewOptions } from "../../components/responsive-preview/ResponsivePreviewEngine.js";
import type { MotionController } from "../../components/responsive-preview/motion-runtime";
const props = defineProps<{ options?: ResponsivePreviewOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountResponsivePreview(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="responsive-preview" /></template>
