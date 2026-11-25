<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountSitePreloader, type SitePreloaderOptions } from "../../components/site-preloader/SitePreloaderEngine.js";
import type { MotionController } from "../../components/site-preloader/motion-runtime";
const props = defineProps<{ options?: SitePreloaderOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountSitePreloader(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="site-preloader" /></template>
