<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountTransferGlow, type TransferGlowOptions } from "../../components/transfer-glow/TransferGlowEngine.js";
import type { MotionController } from "../../components/transfer-glow/motion-runtime";
const props = defineProps<{ options?: TransferGlowOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountTransferGlow(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="transfer-glow" /></template>
