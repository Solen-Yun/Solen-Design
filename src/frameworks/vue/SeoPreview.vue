<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountSeoPreview, type SeoPreviewOptions } from "../../components/seo-preview/SeoPreviewEngine.js";
import type { MotionController } from "../../components/seo-preview/motion-runtime";
const props = defineProps<{ options?: SeoPreviewOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountSeoPreview(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="seo-preview" /></template>
