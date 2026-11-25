<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountInfiniteFeed, type InfiniteFeedOptions } from "../../components/infinite-feed/InfiniteFeedEngine.js";
import type { MotionController } from "../../components/infinite-feed/motion-runtime";
const props = defineProps<{ options?: InfiniteFeedOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountInfiniteFeed(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="infinite-feed" /></template>
