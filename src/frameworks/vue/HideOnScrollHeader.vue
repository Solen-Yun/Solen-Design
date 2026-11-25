<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountHideOnScrollHeader, type HideOnScrollHeaderOptions } from "../../components/hide-on-scroll-header/HideOnScrollHeaderEngine.js";
import type { MotionController } from "../../components/hide-on-scroll-header/motion-runtime";
const props = defineProps<{ options?: HideOnScrollHeaderOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountHideOnScrollHeader(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="hide-on-scroll-header" /></template>
