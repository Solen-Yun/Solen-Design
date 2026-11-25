<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountWordCube, type WordCubeOptions } from "../../components/word-cube/WordCubeEngine.js";
import type { MotionController } from "../../components/word-cube/motion-runtime";
const props = defineProps<{ options?: WordCubeOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountWordCube(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="word-cube" /></template>
