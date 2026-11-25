<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountBlindsSliceSlider, type BlindsSliceSliderOptions } from "../../components/blinds-slice-slider/BlindsSliceSliderEngine.js";
import type { MotionController } from "../../components/blinds-slice-slider/motion-runtime";
const props = defineProps<{ options?: BlindsSliceSliderOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountBlindsSliceSlider(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="blinds-slice-slider" /></template>
