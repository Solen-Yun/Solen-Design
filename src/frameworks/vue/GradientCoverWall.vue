<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountGradientCoverWall, type GradientCoverWallOptions } from "../../components/gradient-cover-wall/GradientCoverWallEngine.js";
import type { MotionController } from "../../components/gradient-cover-wall/motion-runtime";
const props = defineProps<{ options?: GradientCoverWallOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountGradientCoverWall(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="gradient-cover-wall" /></template>
