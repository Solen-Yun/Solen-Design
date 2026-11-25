<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountStampCard, type StampCardOptions } from "../../components/stamp-card/StampCardEngine.js";
import type { MotionController } from "../../components/stamp-card/motion-runtime";
const props = defineProps<{ options?: StampCardOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountStampCard(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="stamp-card" /></template>
