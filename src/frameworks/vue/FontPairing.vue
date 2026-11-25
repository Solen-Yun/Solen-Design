<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountFontPairing, type FontPairingOptions } from "../../components/font-pairing/FontPairingEngine.js";
import type { MotionController } from "../../components/font-pairing/motion-runtime";
const props = defineProps<{ options?: FontPairingOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountFontPairing(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="font-pairing" /></template>
