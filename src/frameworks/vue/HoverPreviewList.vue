<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountHoverPreviewList, type HoverPreviewListOptions } from "../../components/hover-preview-list/HoverPreviewListEngine.js";
import type { MotionController } from "../../components/hover-preview-list/motion-runtime";
const props = defineProps<{ options?: HoverPreviewListOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountHoverPreviewList(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="hover-preview-list" /></template>
