<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountDetailSidePanel, type DetailSidePanelOptions } from "../../components/detail-side-panel/DetailSidePanelEngine.js";
import type { MotionController } from "../../components/detail-side-panel/motion-runtime";
const props = defineProps<{ options?: DetailSidePanelOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountDetailSidePanel(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="detail-side-panel" /></template>
