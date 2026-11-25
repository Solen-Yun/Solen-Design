<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountStickyBuySheet, type StickyBuySheetOptions } from "../../components/sticky-buy-sheet/StickyBuySheetEngine.js";
import type { MotionController } from "../../components/sticky-buy-sheet/motion-runtime";
const props = defineProps<{ options?: StickyBuySheetOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountStickyBuySheet(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="sticky-buy-sheet" /></template>
