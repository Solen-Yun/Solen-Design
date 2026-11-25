<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountAiBrandCoverCards, type AiBrandCoverCardsOptions } from "../../components/ai-brand-cover-cards/AiBrandCoverCardsEngine.js";
import type { MotionController } from "../../components/ai-brand-cover-cards/motion-runtime";
const props = defineProps<{ options?: AiBrandCoverCardsOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountAiBrandCoverCards(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="ai-brand-cover-cards" /></template>
