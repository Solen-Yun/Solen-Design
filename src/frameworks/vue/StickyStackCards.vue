<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountStickyStackCards, type StickyStackCardsOptions } from "../../components/sticky-stack-cards/StickyStackCardsEngine.js";
import type { MotionController } from "../../components/sticky-stack-cards/motion-runtime";
const props = defineProps<{ options?: StickyStackCardsOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountStickyStackCards(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="sticky-stack-cards" /></template>
