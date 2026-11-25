<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountStackedMetadata, type StackedMetadataOptions } from "../../components/stacked-metadata/StackedMetadataEngine.js";
import type { MotionController } from "../../components/stacked-metadata/motion-runtime";
const props = defineProps<{ options?: StackedMetadataOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountStackedMetadata(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="stacked-metadata" /></template>
