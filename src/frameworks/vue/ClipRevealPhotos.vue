<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountClipRevealPhotos, type ClipRevealPhotosOptions } from "../../components/clip-reveal-photos/ClipRevealPhotosEngine.js";
import type { MotionController } from "../../components/clip-reveal-photos/motion-runtime";
const props = defineProps<{ options?: ClipRevealPhotosOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountClipRevealPhotos(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="clip-reveal-photos" /></template>
