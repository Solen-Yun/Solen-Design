<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountScrollspyToc, type ScrollspyTocOptions } from "../../components/scrollspy-toc/ScrollspyTocEngine.js";
import type { MotionController } from "../../components/scrollspy-toc/motion-runtime";
const props = defineProps<{ options?: ScrollspyTocOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountScrollspyToc(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="scrollspy-toc" /></template>
