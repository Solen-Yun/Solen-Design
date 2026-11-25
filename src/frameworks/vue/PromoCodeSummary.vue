<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountPromoCodeSummary, type PromoCodeSummaryOptions } from "../../components/promo-code-summary/PromoCodeSummaryEngine.js";
import type { MotionController } from "../../components/promo-code-summary/motion-runtime";
const props = defineProps<{ options?: PromoCodeSummaryOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountPromoCodeSummary(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="promo-code-summary" /></template>
