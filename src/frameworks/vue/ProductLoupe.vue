<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountProductLoupe, type ProductLoupeOptions } from "../../components/product-loupe/ProductLoupeEngine.js";
import type { MotionController } from "../../components/product-loupe/motion-runtime";
const props = defineProps<{ options?: ProductLoupeOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountProductLoupe(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="product-loupe" /></template>
