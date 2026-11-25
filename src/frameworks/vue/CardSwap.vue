<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountCardSwap, type CardSwapOptions } from "../../components/card-swap/CardSwapEngine.js";
import type { MotionController } from "../../components/card-swap/motion-runtime";
const props = defineProps<{ options?: CardSwapOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountCardSwap(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="card-swap" /></template>
