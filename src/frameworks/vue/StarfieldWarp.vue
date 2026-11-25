<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountStarfieldWarp, type StarfieldWarpOptions } from "../../components/starfield-warp/StarfieldWarpEngine.js";
import type { MotionController } from "../../components/starfield-warp/motion-runtime";
const props = defineProps<{ options?: StarfieldWarpOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountStarfieldWarp(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="starfield-warp" /></template>
