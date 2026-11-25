<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountQuoteShareTooltip, type QuoteShareTooltipOptions } from "../../components/quote-share-tooltip/QuoteShareTooltipEngine.js";
import type { MotionController } from "../../components/quote-share-tooltip/motion-runtime";
const props = defineProps<{ options?: QuoteShareTooltipOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountQuoteShareTooltip(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="quote-share-tooltip" /></template>
