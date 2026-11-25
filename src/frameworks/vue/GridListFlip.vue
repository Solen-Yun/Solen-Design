<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountGridListFlip, type GridListFlipOptions } from "../../components/grid-list-flip/GridListFlipEngine.js";
import type { MotionController } from "../../components/grid-list-flip/motion-runtime";
const props = defineProps<{ options?: GridListFlipOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountGridListFlip(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="grid-list-flip" /></template>
