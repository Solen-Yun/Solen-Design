<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountMarkerHighlight, type MarkerHighlightOptions } from "../../components/marker-highlight/MarkerHighlightEngine.js";
import type { MotionController } from "../../components/marker-highlight/motion-runtime";
const props = defineProps<{ options?: MarkerHighlightOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountMarkerHighlight(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="marker-highlight" /></template>
