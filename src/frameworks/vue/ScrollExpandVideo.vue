<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountScrollExpandVideo, type ScrollExpandVideoOptions } from "../../components/scroll-expand-video/ScrollExpandVideoEngine.js";
import type { MotionController } from "../../components/scroll-expand-video/motion-runtime";
const props = defineProps<{ options?: ScrollExpandVideoOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountScrollExpandVideo(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="scroll-expand-video" /></template>
