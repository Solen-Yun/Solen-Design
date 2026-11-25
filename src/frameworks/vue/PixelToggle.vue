<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountPixelToggle, type PixelToggleOptions } from "../../components/pixel-toggle/PixelToggleEngine.js";
import type { MotionController } from "../../components/pixel-toggle/motion-runtime";
const props = defineProps<{ options?: PixelToggleOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountPixelToggle(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="pixel-toggle" /></template>
