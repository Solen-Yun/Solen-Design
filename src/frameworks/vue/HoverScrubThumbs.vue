<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountHoverScrubThumbs, type HoverScrubThumbsOptions } from "../../components/hover-scrub-thumbs/HoverScrubThumbsEngine.js";
import type { MotionController } from "../../components/hover-scrub-thumbs/motion-runtime";
const props = defineProps<{ options?: HoverScrubThumbsOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountHoverScrubThumbs(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="hover-scrub-thumbs" /></template>
