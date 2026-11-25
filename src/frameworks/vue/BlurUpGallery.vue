<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountBlurUpGallery, type BlurUpGalleryOptions } from "../../components/blur-up-gallery/BlurUpGalleryEngine.js";
import type { MotionController } from "../../components/blur-up-gallery/motion-runtime";
const props = defineProps<{ options?: BlurUpGalleryOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountBlurUpGallery(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="blur-up-gallery" /></template>
