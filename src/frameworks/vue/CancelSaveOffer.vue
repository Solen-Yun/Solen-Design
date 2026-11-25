<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountCancelSaveOffer, type CancelSaveOfferOptions } from "../../components/cancel-save-offer/CancelSaveOfferEngine.js";
import type { MotionController } from "../../components/cancel-save-offer/motion-runtime";
const props = defineProps<{ options?: CancelSaveOfferOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountCancelSaveOffer(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="cancel-save-offer" /></template>
