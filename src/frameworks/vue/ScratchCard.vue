<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountScratchCard, type ScratchCardOptions } from "../../components/scratch-card/ScratchCardEngine.js";
import type { MotionController } from "../../components/scratch-card/motion-runtime";
const props = defineProps<{ options?: ScratchCardOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountScratchCard(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="scratch-card" /></template>
