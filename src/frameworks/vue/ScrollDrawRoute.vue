<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountScrollDrawRoute, type ScrollDrawRouteOptions } from "../../components/scroll-draw-route/ScrollDrawRouteEngine.js";
import type { MotionController } from "../../components/scroll-draw-route/motion-runtime";
const props = defineProps<{ options?: ScrollDrawRouteOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountScrollDrawRoute(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="scroll-draw-route" /></template>
