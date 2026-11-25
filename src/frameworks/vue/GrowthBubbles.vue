<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountGrowthBubbles, type GrowthBubblesOptions } from "../../components/growth-bubbles/GrowthBubblesEngine.js";
import type { MotionController } from "../../components/growth-bubbles/motion-runtime";
const props = defineProps<{ options?: GrowthBubblesOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountGrowthBubbles(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="growth-bubbles" /></template>
