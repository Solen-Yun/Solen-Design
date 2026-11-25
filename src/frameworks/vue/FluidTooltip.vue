<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountFluidTooltip, type FluidTooltipOptions } from "../../components/fluid-tooltip/FluidTooltipEngine.js";
import type { MotionController } from "../../components/fluid-tooltip/motion-runtime";
const props = defineProps<{ options?: FluidTooltipOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountFluidTooltip(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="fluid-tooltip" /></template>
