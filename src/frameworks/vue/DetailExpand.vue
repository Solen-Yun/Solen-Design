<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountDetailExpand, type DetailExpandOptions } from "../../components/detail-expand/DetailExpandEngine.js";
import type { MotionController } from "../../components/detail-expand/motion-runtime";
const props = defineProps<{ options?: DetailExpandOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountDetailExpand(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="detail-expand" /></template>
