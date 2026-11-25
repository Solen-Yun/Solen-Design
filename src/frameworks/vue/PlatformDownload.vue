<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountPlatformDownload, type PlatformDownloadOptions } from "../../components/platform-download/PlatformDownloadEngine.js";
import type { MotionController } from "../../components/platform-download/motion-runtime";
const props = defineProps<{ options?: PlatformDownloadOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountPlatformDownload(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="platform-download" /></template>
