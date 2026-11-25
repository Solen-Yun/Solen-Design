<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountPixelDissolveSlider, type PixelDissolveSliderOptions } from "../../components/pixel-dissolve-slider/PixelDissolveSliderEngine.js";
import type { MotionController } from "../../components/pixel-dissolve-slider/motion-runtime";
const props = defineProps<{ options?: PixelDissolveSliderOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountPixelDissolveSlider(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="pixel-dissolve-slider" /></template>
