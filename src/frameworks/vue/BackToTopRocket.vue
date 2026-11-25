<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountBackToTopRocket, type BackToTopRocketOptions } from "../../components/back-to-top-rocket/BackToTopRocketEngine.js";
import type { MotionController } from "../../components/back-to-top-rocket/motion-runtime";
const props = defineProps<{ options?: BackToTopRocketOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountBackToTopRocket(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="back-to-top-rocket" /></template>
