<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountBlurInQuote, type BlurInQuoteOptions } from "../../components/blur-in-quote/BlurInQuoteEngine.js";
import type { MotionController } from "../../components/blur-in-quote/motion-runtime";
const props = defineProps<{ options?: BlurInQuoteOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountBlurInQuote(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="blur-in-quote" /></template>
