<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountProductHotspots, type ProductHotspotsOptions } from "../../components/product-hotspots/ProductHotspotsEngine.js";
import type { MotionController } from "../../components/product-hotspots/motion-runtime";
const props = defineProps<{ options?: ProductHotspotsOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountProductHotspots(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="product-hotspots" /></template>
