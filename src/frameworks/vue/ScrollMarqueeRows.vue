<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountScrollMarqueeRows, type ScrollMarqueeRowsOptions } from "../../components/scroll-marquee-rows/ScrollMarqueeRowsEngine.js";
import type { MotionController } from "../../components/scroll-marquee-rows/motion-runtime";
const props = defineProps<{ options?: ScrollMarqueeRowsOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountScrollMarqueeRows(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="scroll-marquee-rows" /></template>
