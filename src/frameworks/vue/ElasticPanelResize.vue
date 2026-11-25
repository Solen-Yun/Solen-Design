<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountElasticPanelResize, type ElasticPanelResizeOptions } from "../../components/elastic-panel-resize/ElasticPanelResizeEngine.js";
import type { MotionController } from "../../components/elastic-panel-resize/motion-runtime";
const props = defineProps<{ options?: ElasticPanelResizeOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountElasticPanelResize(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="elastic-panel-resize" /></template>
